import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import "@reactflow/node-resizer/dist/style.css";
import React, { useState } from "react";

import { useCanvasSettings } from "../../../context/CanvasSettingsContext";
import { invertColor } from "../../../helpers";
import { TableColumn } from "../TableColumn/TableColumn";

const useStyles = makeStyles({
  tableRoot: {
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow8,
    borderRadius: "4px",
    overflow: "hidden",
  },
  tableHeader: {
    padding: "8px",
    border: 0,
    fontWeight: "bold",
    textAlign: "center",
    height: "20px",
    cursor: "pointer",
  },

  isSelected: {
    border: `2px solid ${tokens.colorBrandStroke1}`,
  },
  isDragging: {
    // cursor: "grabbing",
  },
});

export const TableColumnNode = (props) => {
  const { data, dragging } = props;
  const [selectedColumn, setSelectedColumn] = useState("");

  const styles = useStyles();
  const { isLightTheme } = useCanvasSettings();

  const selected = data?.isSelected;

  const getColor = (color) => {
    if (isLightTheme) return color;
    return invertColor(color);
  };

  return (
    <div
      className={mergeClasses(
        styles.tableRoot,
        selected && !dragging && styles.isSelected,
        dragging && styles.isDragging
      )}
    >
      <div
        style={{ backgroundColor: getColor(data.schemaColor) }}
        className={styles.tableHeader}
      >
        {data.schema ? `${data.schema}.${data.name}` : data.name}
      </div>
      <div className={styles.tableColumns}>
        {data.columns.map((column, index) => (
          <TableColumn
            key={index}
            column={column}
            selectedColumn={selectedColumn}
            setSelectedColumn={setSelectedColumn}
          />
        ))}
      </div>
    </div>
  );
};
