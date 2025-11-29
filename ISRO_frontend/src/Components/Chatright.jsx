// src/components/RightPanel.jsx

export default function RightPanel() {
  return (
    <div className="w-1/5 h-full bg-[#0b0b0d] border-l border-[#1f1f22] flex flex-col text-white">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {/* USER MESSAGE */}
        <div className="p-3 bg-[#1a1a1d] rounded-xl shadow border border-[#26262b]">
          <p className="text-blue-400 font-semibold text-sm">You</p>
          <p className="mt-1 text-sm text-gray-200">
            Describe the image.
          </p>
        </div>

        {/* AI MESSAGE */}
        <div className="p-3 bg-[#131317] rounded-xl shadow border border-[#26262b]">
          <p className="text-green-400 font-semibold text-sm">GeoNLI</p>
          <p className="mt-1 text-sm text-gray-300">
            This image appears to contain…
          </p>
        </div>

      </div>

      {/* Input */}
      <div className="p-3 border-t border-[#1f1f22] flex items-center gap-2">

        <input
          placeholder="Ask something..."
          className="flex-1 px-4 py-2 bg-[#111114] text-gray-200 border border-[#2b2b30] rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition"
        />

        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm shadow">
          Send
        </button>

      </div>
    </div>
  );
}
