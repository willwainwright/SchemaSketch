import React, { createContext, useContext, useState } from "react";
import { customLightTheme, customDarkTheme } from "../theme";

const CanvasSettingsContext = createContext();

export const CanvasSettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(customLightTheme);
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [showColumns, setShowColumns] = useState(true);

  const toggleTheme = () => {
    const newTheme = isLightTheme ? customDarkTheme : customLightTheme;
    setTheme(newTheme);
    setIsLightTheme(!isLightTheme);
  };

  const toggleShowColumns = () => {
    setShowColumns(!showColumns);
  };

  return (
    <CanvasSettingsContext.Provider
      value={{
        theme,
        toggleTheme,
        isLightTheme,
        showColumns,
        toggleShowColumns,
      }}
    >
      {children}
    </CanvasSettingsContext.Provider>
  );
};

export const useCanvasSettings = () => useContext(CanvasSettingsContext);
