import React, { useState } from "react";

import { FluentProvider, webLightTheme } from "@fluentui/react-components";

import "./App.css";

import Canvas from "./Containers/Canvas";
import ThemeSwitch from "./Components/ThemeSwitch";

function App() {
  const [theme, setTheme] = useState(webLightTheme);

  console.log("webDarkTheme", webLightTheme);

  return (
    <FluentProvider theme={theme}>
      <div className="layout">
        <div className="layout__outlet">
          <Canvas />
        </div>
      </div>
      <ThemeSwitch setTheme={setTheme} />
    </FluentProvider>
  );
}

export default App;
