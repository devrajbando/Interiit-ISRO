import { useState } from "react";
import { ThemeContext } from "./Themecontext";

function Themeprovider({ children }) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    console.log(theme);
  };
  return <ThemeContext.Provider value={{theme,toggleTheme}}>{children}</ThemeContext.Provider>;
}

export default Themeprovider;
