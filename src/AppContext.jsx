import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [count, setCount] = useState(() => {
    // Clear stored count on page load/refresh to prevent Success from showing
    localStorage.removeItem("count");
    return 0;
  });

  const [isDarkModeStored, setIsDarkModeStored] = useState(() => {
    const storedIsDarkMode = localStorage.getItem("isDarkMode");
    console.log("Stored isDarkMode:", storedIsDarkMode);
    return storedIsDarkMode;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return isDarkModeStored === null
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : isDarkModeStored === "true";
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setIsDarkMode(e.matches);

    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <AppContext.Provider
      value={{
        count,
        setCount,
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
