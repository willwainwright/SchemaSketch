import React from "react";
import { makeStyles, tokens, mergeClasses } from "@fluentui/react-components";

const useStyles = makeStyles({
  panelContainer: {
    position: "absolute",
    paddingTop: tokens.spacingVerticalSNudge,
    paddingBottom: tokens.spacingVerticalSNudge,
    width: "0px",
    height: "100%",
    left: "0",
    zIndex: 10,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    transition: "width 0.2s ease",
    visibility: "hidden",
    overflow: "hidden",
  },
  panelOpen: {
    width: "300px",
    display: "block",
    visibility: "visible",
  },
  panelContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

const Panel = (props) => {
  const { open, children } = props;

  // Hooks
  const styles = useStyles();

  return (
    <div
      className={mergeClasses(styles.panelContainer, open && styles.panelOpen)}
    >
      {children}
    </div>
  );
};

export default Panel;
