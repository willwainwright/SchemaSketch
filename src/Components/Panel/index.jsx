import React from "react";
import { makeStyles, tokens, mergeClasses } from "@fluentui/react-components";

const useStyles = makeStyles({
  panelContainer: {
    position: "absolute",
    paddingBottom: tokens.spacingVerticalSNudge,
    width: "0px",
    height: "100%",
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
  left: {
    left: "0",
  },
  right: {
    right: "0",
  },
});

const Panel = (props) => {
  const { open, children, side } = props;

  // Hooks
  const styles = useStyles();

  return (
    <div
      className={mergeClasses(
        styles.panelContainer,
        open && styles.panelOpen,
        side === "left" ? styles.left : styles.right
      )}
    >
      {children}
    </div>
  );
};

export default Panel;
