import {
  Button,
  makeStyles,
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import {
  ChevronDownRegular,
  ChevronRightRegular,
  Edit16Regular,
  MoreHorizontal16Regular,
} from "@fluentui/react-icons";
import React from "react";

import Collapse from "../Collapse";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  header: {
    cursor: "pointer",
    height: "40px",
    width: "100%",
    maxWidth: "100%",
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      "& button": {
        visibility: "visible", // Make the menu items visible on hover
      },
    },
  },
  headerSelected: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
  },
  headerDeselected: {
    backgroundColor: tokens.colorNeutralBackground1Hover,
  },
  headerMenuItems: {
    visibility: "hidden", // Initially hide the menu items
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto", // Push to the end
  },
  contentWrapper: {
    paddingLeft: "12px", // Indent the content
    backgroundColor: tokens.colorNeutralBackground1,
    overflow: "hidden",
  },
});

const ExpandableTable = (props) => {
  const { children, title, selected, deselected, onOpen, onClose, id } = props;

  // Hooks
  const styles = useStyles();

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleChevronClick = (e) => {
    e.preventDefault();
    if (selected) {
      onClose(id);
    } else {
      onOpen(id);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={mergeClasses(
          styles.header,
          selected && styles.headerSelected,
          deselected && styles.headerDeselected
        )}
        onClick={handleChevronClick}
      >
        <Button
          icon={selected ? <ChevronDownRegular /> : <ChevronRightRegular />}
          appearance="transparent"
        />
        {title}
        <div className={styles.headerMenuItems}>
          <Button
            icon={<Edit16Regular />}
            appearance="transparent"
            onClick={handleEdit}
          />
          <Button
            icon={<MoreHorizontal16Regular />}
            appearance="transparent"
            onClick={handleEdit}
          />
        </div>
      </div>

      <div className={styles.content}>
        <Collapse isOpen={selected}>{children}</Collapse>
      </div>
    </div>
  );
};

export default ExpandableTable;
