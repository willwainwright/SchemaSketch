import React from "react";
import {
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
} from "@fluentui/react-components";
import { Handle, Position } from "reactflow";
import { KeyIcon } from "../KeyIcon/KeyIcon";

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
      </div>
    </div>
  );
};
