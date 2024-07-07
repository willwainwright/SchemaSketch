import React from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

import "./App.css";
import Canvas from "./Containers/Canvas";
import ThemeSwitch from "./Components/ThemeSwitch";
import { ThemeProvider, useTheme } from "./Context/ThemeContext";

const AppContent = () => {
  const { theme } = useTheme();
  return (
    <FluentProvider theme={theme ?? webLightTheme}>
      <div className="layout">
        <div className="layout__outlet">
          <Canvas />
        </div>
      </div>
      <ThemeSwitch />
    </FluentProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
