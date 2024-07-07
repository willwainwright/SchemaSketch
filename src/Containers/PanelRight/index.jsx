import React from "react";
import { makeStyles, tokens, mergeClasses } from "@fluentui/react-components";

const useStyles = makeStyles({
  rightPanel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: tokens.spacingVerticalSNudge,
    paddingBottom: tokens.spacingVerticalSNudge,
    width: "0px",
    height: "100%",
    transition: "width 0.2s ease",
  },
  rightPanelOpen: {
    width: "400px",
    borderLeft: `1px solid ${tokens.colorNeutralStroke3}`,
  },
});

const PanelRight = (props) => {
  const { open } = props;

  // Hooks
  const styles = useStyles();

  return (
    <div
      className={mergeClasses(styles.rightPanel, open && styles.rightPanelOpen)}
    ></div>
  );
};

export default PanelRight;
