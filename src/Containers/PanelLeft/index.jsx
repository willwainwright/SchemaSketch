import React from "react";
import Panel from "../../components/Panel";

// const useStyles = makeStyles({});

const PanelLeft = (props) => {
  const { open } = props;

  // Hooks
  // const styles = useStyles();

  return (
    <Panel open={open} side="left">
      Left Panel
    </Panel>
  );
};

export default PanelLeft;
