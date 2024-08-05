import {
  Button,
  makeStyles,
  mergeClasses,
  Subtitle1,
  tokens,
} from "@fluentui/react-components";
import { ChevronLeftFilled, ChevronRightFilled } from "@fluentui/react-icons";
import React from "react";
import { PANEL_SIDES } from "../../constants/panel";

const useStyles = makeStyles({
  panelContainer: {
    position: "absolute",
    paddingBottom: tokens.spacingVerticalSNudge,
    width: "0px",
    height: "calc(100% - 89px)",
    zIndex: 5,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    transition: "width 0.4s ease",
    // visibility: "hidden",
    overflow: "hidden",
  },
  panelOpen: {
    width: "300px",
    display: "block",
    visibility: "visible",
    transition: "width 0.3s ease",
  },

  left: {
    left: "0",
  },
  right: {
    right: "0",
  },
  header: {
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}  ${tokens.spacingVerticalS}`,
    width: "100%",
    maxWidth: "100%",
    gap: tokens.spacingHorizontalS,
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-between",
  },
  headerCloseButton: {
    marginRight: tokens.spacingVerticalXXL,
  },
  content: {
    padding: `0 ${tokens.spacingHorizontalXXL}`,
    flex: `1 1 0%`,
    alignSelf: "stretch",
    position: "relative",

    overflow: "auto",
  },
  toggleButton: {
    zIndex: 99,
    position: "absolute",
    top: "100px",
    left: "0px",
    transition: "left 0.3s ease",
  },
  toggleButtonOpen: {
    left: "285px",
  },
});

const Panel = (props) => {
  const { open, children, side, togglePanel, title, showToggle } = props;

  // Hooks
  const styles = useStyles();

  return (
    <>
      {showToggle && (
        <Button
          className={mergeClasses(
            styles.toggleButton,
            open && styles.toggleButtonOpen
          )}
          onClick={togglePanel}
          icon={open ? <ChevronLeftFilled /> : <ChevronRightFilled />}
        />
      )}
      <div
        className={mergeClasses(
          styles.panelContainer,
          open && styles.panelOpen,
          side === PANEL_SIDES.LEFT ? styles.left : styles.right
        )}
      >
        <div className={styles.header}>
          <Subtitle1>{title}</Subtitle1>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

export default Panel;
