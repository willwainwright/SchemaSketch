import React from "react";
import {
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
} from "@fluentui/react-components";
import { Handle, Position } from "reactflow";
import { KeyIcon } from "../KeyIcon/KeyIcon";
import { markdown } from "../../Helpers";

const useStyles = makeStyles({
  column: {
    position: "relative",
    zIndex: 50,
    borderBottom: 0,
    fontSize: "12px",
    lineHeight: 1,
    cursor: "pointer",

    "&:last-child": {
      borderBottom: "0 !important",
      borderRadius: "0 0 4px 4px",
    },

    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  columnName: {
    marginRight: tokens.spacingVerticalS,
  },
  columnType: {
    color: "#BBB",
  },
  columnInner: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px",
    position: "relative",
  },
  columnDescription: {
    display: "none",
    position: "absolute",
    top: "50%",
    right: "-6px",
    width: "150px",
    transform: "translateX(100%) translateY(-50%)",
    padding: "8px",
    zIndex: 1000,
    border: "1px solid #CBD2D9",
    borderRadius: "4px",
    backgroundColor: tokens.colorNeutralBackground1,

    "&:before": {
      position: "absolute",
      top: "50%",
      right: "100%",
      transform: "translateX(-0.5px) translateY(-50%)",
      ...shorthands.borderWidth("4px"),
      ...shorthands.borderStyle("solid"),
      ...shorthands.borderColor("transparent #CBD2D9 transparent transparent"),
      content: '""',
    },

    "&:after": {
      position: "absolute",
      top: "50%",
      right: "100%",
      transform: "translateX(0px) translateY(-50%)",

      ...shorthands.borderWidth("3px"),
      ...shorthands.borderStyle("solid"),
      ...shorthands.borderColor(
        `transparent ${tokens.colorNeutralBackground1} transparent transparent`
      ),
      content: '""',
    },
  },
  selected: {
    display: "block",
  },

  handle: {
    width: "2px",
    height: "2px",
    minWidth: "2px",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  },

  leftHandle: {
    left: 0,
    transform: "translateX(-50%) translateY(-50%)",
  },
  rightHandle: {
    right: 0,
    transform: "translateX(50%) translateY(-50%)",
  },
});

export const TableColumn = (props) => {
  const {
    column,
    selectedColumn,
    descriptionOnHoverActive,
    setSelectedColumn,
  } = props;

  const styles = useStyles();

  return (
    <div
      className={mergeClasses(
        styles.column,
        selectedColumn === column.name && styles.selected
      )}
      onMouseEnter={() => {
        if (descriptionOnHoverActive) {
          setSelectedColumn(column.name);
        }
      }}
      onMouseLeave={() => setSelectedColumn("")}
    >
      {column.handleType && (
        <Handle
          type={column.handleType}
          position={Position.Right}
          id={`${column.name}-right`}
          className={mergeClasses(
            styles.handle,
            column.handleType === "source"
              ? styles.rightHandle
              : styles.leftHandle
          )}
        />
      )}
      {column.handleType && (
        <Handle
          type={column.handleType}
          position={Position.Left}
          id={`${column.name}-left`}
          className={mergeClasses(
            styles.handle,
            column.handleType === "source"
              ? styles.rightHandle
              : styles.leftHandle
          )}
        />
      )}

      <div className={mergeClasses(styles.columnName, styles.columnInner)}>
        <div className={mergeClasses(styles.columnName, styles.columnName)}>
          {column.key && <KeyIcon />}
          {column.name}
        </div>
        <div className={mergeClasses(styles.columnName, styles.columnNameType)}>
          {column.type}
        </div>

        <div
          className={mergeClasses(styles.columnName, styles.columnDescription)}
          dangerouslySetInnerHTML={{
            __html: markdown(column.description || "No description."),
          }}
        />
      </div>
    </div>
  );
};
