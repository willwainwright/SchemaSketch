import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import "@reactflow/node-resizer/dist/style.css";
import React from "react";
import { Handle, Position } from "reactflow";

import { useCanvasSettings } from "../../../context/CanvasSettingsContext";
import { invertColor } from "../../../helpers";

const useStyles = makeStyles({
  tableRoot: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  tableHeader: {
    padding: "8px",
    border: 0,
    borderRadius: "4px 4px 0 0",
    fontWeight: "bold",
    textAlign: "center",
    height: "20px",
  },
  tableColumns: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderTop: 0,
    borderRadius: "0 0 4px 4px",
  },
  handle: {
    position: "absolute",
    top: "18px",
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

export const TableNode = (props) => {
  const { data } = props;

  const styles = useStyles();
  const { isLightTheme } = useCanvasSettings();

  const getColor = (color) => {
    if (isLightTheme) return color;
    return invertColor(color);
  };

  return (
    <div className={styles.tableRoot}>
      <div
        style={{ backgroundColor: getColor(data.schemaColor) }}
        className={styles.tableHeader}
      >
        {/* Add four handles to the header card. This is for the collapsed view
        TODO find a way of bidirectional edges rather than the four (it does work though)  */}
        <Handle
          type={"source"}
          position={Position.Left}
          id={`source-header-left`}
          className={mergeClasses(styles.handle, styles.handleLeft)}
        />
        <Handle
          type={"target"}
          position={Position.Left}
          id={`target-header-left`}
          className={mergeClasses(styles.handle, styles.handleLeft)}
        />

        {data.schema ? `${data.schema}.${data.name}` : data.name}

        <Handle
          type={"source"}
          position={Position.Right}
          id={`source-header-right`}
          className={mergeClasses(styles.handle, styles.handleRight)}
        />
        <Handle
          type={"target"}
          position={Position.Right}
          id={`target-header-right`}
          className={mergeClasses(styles.handle, styles.handleRight)}
        />
      </div>
    </div>
  );
};
