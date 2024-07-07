import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  RightPanel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: tokens.spacingVerticalSNudge,
    paddingBottom: tokens.spacingVerticalSNudge,
    height: "0px",
  },
});

const RightPanel = React.memo(() => {
  // Hooks
  const styles = useStyles();

  return <div className={styles.RightPanel}></div>;
});

export default RightPanel;
