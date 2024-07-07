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
import { ThemeProvider, useTheme } from "./context/ThemeContext";

// https://coolors.co/palette/606c38-283618-fefae0-dda15e-bc6c25

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
  const { theme } = useTheme();
  return (
    <FluentProvider theme={theme ?? webLightTheme}>
      <Routes />
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
