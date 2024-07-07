import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  LeftPanel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: tokens.spacingVerticalSNudge,
    paddingBottom: tokens.spacingVerticalSNudge,
    height: "0px",
  },
});

const LeftPanel = React.memo(() => {
  // Hooks
  const styles = useStyles();

  return <div className={styles.LeftPanel}></div>;
});

export default LeftPanel;
