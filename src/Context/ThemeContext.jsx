import React, { createContext, useContext, useState } from "react";
import { customLightTheme, customDarkTheme } from "../theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(customLightTheme);
  const [isLightTheme, setIsLightTheme] = useState(true);

  const toggleTheme = () => {
    const newTheme = isLightTheme ? customDarkTheme : customLightTheme;
    setTheme(newTheme);
    setIsLightTheme(!isLightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isLightTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
