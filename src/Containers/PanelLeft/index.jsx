import React from "react";
import { makeStyles, tokens, mergeClasses } from "@fluentui/react-components";

const useStyles = makeStyles({
  leftPanel: {
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
  leftPanelOpen: {
    width: "400px",
    borderRight: `1px solid ${tokens.colorNeutralStroke3}`,
  },
});

const PanelLeft = (props) => {
  const { open } = props;

  // Hooks
  const styles = useStyles();

  return (
    <div
      className={mergeClasses(styles.leftPanel, open && styles.leftPanelOpen)}
    ></div>
  );
};

export default PanelLeft;
