import { useContext } from "react";
import { ThemeContext } from "../Context/theme/Themecontext.jsx";

export default function LeftPanel() {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";
  const bg = isDark ? "#0b0b0d" : "#ffffff";
  const text = isDark ? "#ffffff" : "#000000";
  const border = isDark ? "#1f1f22" : "#e3e3e3";

  return (
    <div
      className="w-1/5 h-full flex flex-col"
      style={{ background: bg, color: text, borderRight: `1px solid ${border}` }}
    >
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${border}` }}
      >
        <h2 className="text-lg font-semibold tracking-wide">Sessions</h2>
        <button className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 transition rounded-md shadow">
          + New
        </button>
      </div>

      {/* Session list */}
      <div className="flex-1 overflow-y-auto">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className="p-4 cursor-pointer group transition"
          >
            <p className="font-medium group-hover:text-blue-400 transition">Chat {s}</p>
            <p className="text-xs mt-1" style={{ color: isDark ? "#aaaaaa" : "#555" }}>
              2 messages
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
