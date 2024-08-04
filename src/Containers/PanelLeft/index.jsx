import React from "react";

import Panel from "../../components/Panel";
import { PANEL_SIDES } from "../../constants/panel";

// const useStyles = makeStyles({});

const PanelLeft = (props) => {
  const { open, togglePanel, selectedItem, selectedItemType } = props;

  // Hooks
  // const styles = useStyles();

  console.log("selectedItem", selectedItem);

  // if (!selectedItem?.id) return;
  return (
    <Panel
      open={open}
      side={PANEL_SIDES.LEFT}
      togglePanel={togglePanel}
      title={selectedItem?.data?.name}
      showToggle={true}
    >
      {JSON.stringify(selectedItem)}
    </Panel>
  );
};

export default PanelLeft;
