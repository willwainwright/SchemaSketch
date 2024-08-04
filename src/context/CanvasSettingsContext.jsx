import React, { createContext, useContext, useState } from "react";
import { FLOW_VIEWS } from "../constants/flow";
import { customDarkTheme, customLightTheme } from "../theme";

const CanvasSettingsContext = createContext();

export const CanvasSettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(customLightTheme);
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [flowView, setFlowView] = useState(FLOW_VIEWS.COLUMN);

  const toggleTheme = () => {
    const newTheme = isLightTheme ? customDarkTheme : customLightTheme;
    setTheme(newTheme);
    setIsLightTheme(!isLightTheme);
  };

  const toggleShowColumns = () => {
    // this will be replaced with multiple views
    if (flowView === FLOW_VIEWS.COLUMN) {
      setFlowView(FLOW_VIEWS.TABLE);
    } else {
      setFlowView(FLOW_VIEWS.COLUMN);
    }
  };

  return (
    <CanvasSettingsContext.Provider
      value={{
        theme,
        toggleTheme,
        isLightTheme,
        flowView,
        toggleShowColumns,
      }}
    >
      {children}
    </CanvasSettingsContext.Provider>
  );
};

export const useCanvasSettings = () => useContext(CanvasSettingsContext);
