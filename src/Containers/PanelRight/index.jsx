import React from "react";
import { makeStyles, tokens, mergeClasses } from "@fluentui/react-components";
import Panel from "../../components/Panel";

const useStyles = makeStyles({});

const PanelRight = (props) => {
  const { open } = props;

  // Hooks
  const styles = useStyles();

  return <Panel open={open}> Right Panel </Panel>;
};

export default PanelRight;
