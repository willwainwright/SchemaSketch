import React from "react";
import { useNodes } from "reactflow";

import Panel from "../../components/Panel";

// const useStyles = makeStyles({});

const PanelLeft = (props) => {
  const { open } = props;

  // Hooks
  // const styles = useStyles();

  const nodes = useNodes();

  return (
    <Panel open={open} side="left">
      Left Panel
      <div>There are currently {nodes.length} nodes!</div>
    </Panel>
  );
};

export default PanelLeft;
