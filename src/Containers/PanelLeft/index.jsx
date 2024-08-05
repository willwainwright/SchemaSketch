import React, { useEffect, useState } from "react";
import { useNodes } from "reactflow";

import { makeStyles } from "@fluentui/react-components";
import ExpandableTable from "../../components/ExpandableTable";
import Panel from "../../components/Panel";
import { PANEL_SIDES } from "../../constants/panel";

const useStyles = makeStyles({
  header: {
    width: "100%",
    maxWidth: "100%",
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ":hover": {
      "& button": {
        visibility: "visible", // Make the menu items visible on hover
      },
    },
  },
  headerMenuItems: {
    visibility: "hidden", // Initially hide the menu items
    flexDirection: "row",
    alignItems: "center",
  },
});

const PanelLeft = (props) => {
  const { open, togglePanel, selectedItem, selectedItemType } = props;

  const [openItem, setOpenItem] = useState("");

  // Hooks
  const nodes = useNodes();
  const styles = useStyles();

  useEffect(() => {
    if (!!selectedItem?.id) {
      setOpenItem(selectedItem.id);
    } else {
      setOpenItem("");
    }
  }, [selectedItem]);

  const handleToggle = (_, data) => {
    setOpenItem(data.openItems);
  };

  const handleEdit = (e) => {
    e.preventDefault();
  };

  const handleOnTableOpen = (key) => {
    console.log("handleOnTableOpen", key);
    setOpenItem(key);
  };

  const handleOnTableClose = (key) => {
    console.log("handleOnTableClose", key);
    setOpenItem("");
  };

  return (
    <Panel
      open={open}
      side={PANEL_SIDES.LEFT}
      togglePanel={togglePanel}
      title={selectedItemType === "node" && "Tables"}
      showToggle={true}
    >
      {nodes &&
        nodes.map((node) => (
          <ExpandableTable
            key={node.id}
            id={node.id}
            title={node.data.name}
            selected={openItem === node.id}
            deselected={openItem !== "" && openItem !== node.id} // Item is deselected if another item is selected
            onOpen={handleOnTableOpen}
            onClose={handleOnTableClose}
          >
            <div>Accordion Panel 1</div>
          </ExpandableTable>
        ))}
      {/* <Accordion openItems={openItems} onToggle={handleToggle} collapsible>
        {nodes &&
          nodes.map((node) => (
            // <AccordionItem value={node.id} key={node.id}>
            //   <AccordionHeader>
            //       <div className={styles.header}>
            //         {node.data.name}
            //         <div className={styles.headerMenuItems}>
            //           <Button
            //             icon={<Edit16Regular />}
            //             appearance="transparent"
            //             onClick={handleEdit}
            //           />
            //           <Button
            //             icon={<MoreHorizontal16Regular />}
            //             appearance="transparent"
            //             onClick={handleEdit}
            //           />
            //         </div>
            //       </div>
            //     </AccordionHeader>
            //     <AccordionPanel>
            //       <div>Accordion Panel 1</div>
            //     </AccordionPanel>
            //   </AccordionItem>
          ))}
      </Accordion> */}
    </Panel>
  );
};

export default PanelLeft;
