import React, { createContext, useContext, useState } from "react";
import { customLightTheme, customDarkTheme } from "../theme";

const CanvasSettingsContext = createContext();

export const CanvasSettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(customLightTheme);
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [nodesCollapsed, setShowColumns] = useState(false);

  const toggleTheme = () => {
    const newTheme = isLightTheme ? customDarkTheme : customLightTheme;
    setTheme(newTheme);
    setIsLightTheme(!isLightTheme);
  };

  const toggleShowColumns = () => {
    setShowColumns(!nodesCollapsed);
  };

  return (
    <CanvasSettingsContext.Provider
      value={{
        theme,
        toggleTheme,
        isLightTheme,
        nodesCollapsed,
        toggleShowColumns,
      }}
    >
      {children}
    </CanvasSettingsContext.Provider>
  );
};

export const useCanvasSettings = () => useContext(CanvasSettingsContext);
