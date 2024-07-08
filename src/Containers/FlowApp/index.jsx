import React from "react";
import { Outlet } from "react-router-dom";
import { makeStyles } from "@fluentui/react-components";

import TopBar from "../../components/TopBar";
import BottomBar from "../../components/BottomBar";
import { ReactFlowProvider } from "reactflow";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflowX: "hidden",
    justifyContent: "space-between",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    overflowY: "hidden",
    flexGrow: 1,
    justifyContent: "space-between",
  },
});

const FlowApp = () => {
  const styles = useStyles();

  return (
    <ReactFlowProvider>
      <div className={styles.container}>
        <TopBar />
        <div className={styles.content}>
          <Outlet />
        </div>
        <BottomBar />
      </div>
    </ReactFlowProvider>
  );
};

export default FlowApp;
