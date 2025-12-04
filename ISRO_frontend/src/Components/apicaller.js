import axios from "axios";

// ------------------ KEYWORDS ------------------ //

const CAPTION_KEYWORDS = [
  "describe",
  "caption",
  "summarize",
  "explain",
  "details",
  "overview",
  "scene",
  "context",
  "summary",
  "content",
  "visualize",
  "depict",
  "what",
];

const GROUNDING_KEYWORDS = [
  "where",
  "locate",
  "box",
  "position",
  "highlight",
  "identify",
  "mark",
  "find",
  "pointer",
  "spot",
  "trace",
  "detect",
  "localize",
];

const ATTRIBUTE_BINARY = [
  "is",
  "exists",
  "present",
  "visible",
  "contain",
  "appear",
  "presence",
  "any",
  "existence",
  "bool",
  "pillar",
  "plane",
  "digit",
];

const ATTRIBUTE_NUMERIC = [
  "how",
  "many",
  "count",
  "number",
  "quantity",
  "total",
  "amount",
  "sum",
  "tally",
  "compute",
];

const ATTRIBUTE_SEMANTIC = [
  "color",
  "type",
  "material",
  "shape",
  "category",
  "kind",
  "label",
  "semantic",
  "appearance",
  "texture",
  "class",
];

// ------------------ DETECT QUERY TYPE ------------------ //

function detectQueryType(prompt) {
  const p = prompt.toLowerCase();

  if (CAPTION_KEYWORDS.some((k) => p.includes(k))) return "caption_query";
  if (GROUNDING_KEYWORDS.some((k) => p.includes(k))) return "grounding_query";
  if (
    ATTRIBUTE_BINARY.some((k) => p.includes(k)) ||
    ATTRIBUTE_NUMERIC.some((k) => p.includes(k)) ||
    ATTRIBUTE_SEMANTIC.some((k) => p.includes(k))
  ) {
    return "attribute_query";
  }

  // DEFAULT
  return "caption_query";
}

// ------------------ DETECT ATTRIBUTE SUBTYPE ------------------ //

function detectAttributeSubtype(prompt) {
  const p = prompt.toLowerCase();

  if (ATTRIBUTE_NUMERIC.some((k) => p.includes(k))) return "numeric";
  if (ATTRIBUTE_SEMANTIC.some((k) => p.includes(k))) return "semantic";
  return "binary";
}

// ------------------ API CALLER ------------------ //

const handlemodelresponse = async (prompt, input_image, image_url) => {
  try {
    if (!prompt || !input_image) return "Missing prompt or image.";

    // ---------------------------------------------
    // FIXED METADATA BLOCK (unchanged)
    // ---------------------------------------------
    const inputPayload = {
      image_id: input_image,
      image_url: image_url,
      metadata: {
        width: 512,
        height: 512,
        spatial_resolution_m: 1.57,
      },
    };

    const queryType = detectQueryType(prompt);

    // Always keep all three attribute fields
    const binaryObj = { instruction: null };
    const numericObj = { instruction: null };
    const semanticObj = { instruction: null };

    let attributeSubtype = null;
    if (queryType === "attribute_query") {
      attributeSubtype = detectAttributeSubtype(prompt);

      if (attributeSubtype === "binary") binaryObj.instruction = prompt;
      if (attributeSubtype === "numeric") numericObj.instruction = prompt;
      if (attributeSubtype === "semantic") semanticObj.instruction = prompt;
    }

    // ALWAYS include all queries — NEVER NULL
    const body = {
      input_image: inputPayload,
      queries: {
        caption_query: {
          instruction: queryType === "caption_query" ? prompt : null,
        },
        grounding_query: {
          instruction: queryType === "grounding_query" ? prompt : null,
        },
        attribute_query: {
          binary: binaryObj,
          numeric: numericObj,
          semantic: semanticObj,
        },
      },
    };

    console.log("🔥 Final Payload →", JSON.stringify(body, null, 2));

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}/api/interactive_analysis`,
      body
    );

    // ---------------- Clean Output Return ---------------- //

    // ---------------- Clean Model Response Extractor ---------------- //
    console.log(response);
    if (response?.data?.success) {
      const modelQueries = response.data.model_response.queries;
      const q = body.queries;

      // CAPTION
      if (q.caption_query.instruction) {
        return (
          modelQueries.caption_query?.response || "⚠️ Empty caption response."
        );
      }

      // GROUNDING
      if (q.grounding_query.instruction) {
        return (
          modelQueries.grounding_query?.response ||
          "⚠️ Empty grounding response."
        );
      }

      // ATTRIBUTE
      if (q.attribute_query) {
        if (q.attribute_query.binary.instruction) {
          return (
            modelQueries.attribute_query?.binary.response || "⚠️ Empty binary response."
          );
        }
        if (q.attribute_query.numeric.instruction) {
          return (
            modelQueries.attribute_query?.numeric.response ||
            "⚠️ Empty numeric response."
          );
        }
        if (q.attribute_query.semantic.instruction) {
          return (
            modelQueries.attribute_query?.semantic.response ||
            "⚠️ Empty semantic response."
          );
        }
      }
    }
    return "⚠️ No valid model response.";
  } catch (err) {
    console.error("❌ Model error:", err?.response?.data?.error);
    return err?.response?.data?.error;
  }
};

export default handlemodelresponse;
