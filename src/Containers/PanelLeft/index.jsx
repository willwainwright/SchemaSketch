import React from "react";
import { makeStyles, tokens, mergeClasses } from "@fluentui/react-components";
import Panel from "../../components/Panel";

const useStyles = makeStyles({});

const PanelLeft = (props) => {
  const { open } = props;

  // Hooks
  const styles = useStyles();

  return <Panel open={open}> Left Panel </Panel>;
};

export default PanelLeft;
