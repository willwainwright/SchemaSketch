import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  BottomBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: tokens.spacingVerticalSNudge,
    paddingBottom: tokens.spacingVerticalSNudge,
    height: "40px",
  },
});

const BottomBar = React.memo(() => {
  // Hooks
  const styles = useStyles();

  return <div className={styles.BottomBar}></div>;
});

export default BottomBar;
