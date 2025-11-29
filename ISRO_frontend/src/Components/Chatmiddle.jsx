import { useContext } from "react";
import { ThemeContext } from "../Context/theme/Themecontext.jsx";

export default function MiddlePanel() {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";
  const bg = isDark ? "#0d0d0f" : "#ffffff";
  const text = isDark ? "#ffffff" : "#000000";
  const border = isDark ? "#1f1f22" : "#e3e3e3";

  return (
    <div
      className="w-3/5 h-full relative flex items-center justify-center overflow-hidden"
      style={{ background: bg, color: text }}
    >
      {/* Placeholder */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ border: `1px solid ${border}` }}
        >
          <span className="text-3xl">🖼️</span>
        </div>
        <p
          className="mt-4 text-sm"
          style={{ color: isDark ? "#b0b0b0" : "#444" }}
        >
          Upload an image to begin
        </p>
      </div>
    </div>
  );
}
