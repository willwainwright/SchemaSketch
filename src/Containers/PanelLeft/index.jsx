import React, { useEffect, useState } from "react";
import { useNodes } from "reactflow";

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from "@fluentui/react-components";
import Panel from "../../components/Panel";
import { PANEL_SIDES } from "../../constants/panel";

// const useStyles = makeStyles({});

const PanelLeft = (props) => {
  const { open, togglePanel, selectedItem, selectedItemType } = props;

  const [openItems, setOpenItems] = useState([]);

  // Hooks
  const nodes = useNodes();

  useEffect(() => {
    if (!!selectedItem?.id) {
      setOpenItems([selectedItem.id]);
    } else {
      setOpenItems([]);
    }
  }, [selectedItem]);

  const handleToggle = (_, data) => {
    setOpenItems(data.openItems);
  };

  // const styles = useStyles();

  return (
    <Panel
      open={open}
      side={PANEL_SIDES.LEFT}
      togglePanel={togglePanel}
      title={selectedItemType === "node" && "Tables"}
      showToggle={true}
    >
      <Accordion openItems={openItems} onToggle={handleToggle} collapsible>
        {nodes &&
          nodes.map((node) => (
            <AccordionItem value={node.id} key={node.id}>
              <AccordionHeader>{node.data.name}</AccordionHeader>
              <AccordionPanel>
                <div>Accordion Panel 1</div>
              </AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion>
    </Panel>
  );
};

export default PanelLeft;
