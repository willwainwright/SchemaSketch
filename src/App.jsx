import React from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import "./App.css";
import Canvas from "./containers/Canvas";
import FlowApp from "./containers/FlowApp";
import {
  CanvasSettingsProvider,
  useCanvasSettings,
} from "./context/CanvasSettingsContext";

function Routes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <React.Fragment>
        <Route element={<FlowApp />}>
          <Route path="/" element={<Canvas />} />
          <Route path="/SchemaSketch" element={<Canvas />} />
        </Route>
      </React.Fragment>
    )
  );

  return <RouterProvider router={router} />;
}

const AppContent = () => {
  const { theme } = useCanvasSettings();
  return (
    <FluentProvider theme={theme ?? webLightTheme}>
      <Routes />
    </FluentProvider>
  );
};

function App() {
  return (
    <CanvasSettingsProvider>
      <AppContent />
    </CanvasSettingsProvider>
  );
}

export default App;
