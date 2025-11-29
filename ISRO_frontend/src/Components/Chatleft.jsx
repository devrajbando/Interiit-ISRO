// src/components/LeftPanel.jsx

export default function LeftPanel() {
  return (
    <div className="w-1/5 h-full bg-[#0b0b0c] border-r border-[#1f1f22] flex flex-col text-white">

      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-[#1f1f22]">
        <h2 className="text-lg font-semibold tracking-wide">Sessions</h2>
        <button className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 transition rounded-md shadow">
          + New
        </button>
      </div>

      {/* Session List */}
      <div className="flex-1 overflow-y-auto">

        {[1,2,3].map((s) => (
          <div
            key={s}
            className="p-4 border-b border-[#1f1f22] hover:bg-[#141416] cursor-pointer group transition"
          >
            <p className="font-medium group-hover:text-blue-400 transition">
              Chat {s}
            </p>
            <p className="text-xs text-gray-500 mt-1">2 messages</p>
          </div>
        ))}

      </div>
    </div>
  );
}
