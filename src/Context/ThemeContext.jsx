import React, { createContext, useContext, useState } from "react";
import { webLightTheme } from "@fluentui/react-components";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(webLightTheme);
  const [isLightTheme, setIsLightTheme] = useState(true);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, isLightTheme, setIsLightTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
