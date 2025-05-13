import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [username, setUsername] = useState(null);

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

  // Firebase Authentication
  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(
      getAuth(),
      async (result) => {
        setUsername(result ? result.email.split("@")[0] : null);
        console.log("AppContext > username = ", username);
      }
    );
  }, []);

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
        username,
        setUsername,
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
