// src/components/MiddlePanel.jsx

export default function MiddlePanel() {
  return (
    <div className="w-3/5 h-full bg-[#0d0d0f] relative flex items-center justify-center overflow-hidden">

      {/* Placeholder when no image */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
        <div className="w-20 h-20 rounded-full border border-gray-600 flex items-center justify-center">
          <span className="text-3xl">🖼️</span>
        </div>
        <p className="mt-4 text-gray-400 text-sm">Upload an image to begin</p>
      </div>

      {/* When image exists, replace above block with <img /> */}

    </div>
  );
}
