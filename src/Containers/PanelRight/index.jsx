import { makeStyles, tokens } from "@fluentui/react-components";
import React from "react";
import Panel from "../../components/Panel";

const useStyles = makeStyles({
  titleBar: {
    height: "20px",
    width: "100%",
    backgroundColor: tokens.colorPaletteLightTealBackground2,
    textAlign: "center",
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
  },
});

const PanelRight = (props) => {
  const { open } = props;

  // Hooks
  const styles = useStyles();

  return (
    <Panel open={open} side="right" showToggle={false}>
      <div className={styles.titleBar}>Properties</div>
    </Panel>
  );
};

export default PanelRight;
