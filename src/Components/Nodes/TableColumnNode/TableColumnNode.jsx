import { makeStyles, tokens } from "@fluentui/react-components";
import "@reactflow/node-resizer/dist/style.css";
import React, { useState } from "react";

import { useCanvasSettings } from "../../../context/CanvasSettingsContext";
import { invertColor } from "../../../helpers";
import { TableColumn } from "../TableColumn/TableColumn";

const useStyles = makeStyles({
  tableRoot: {
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow8,
    // border: `1px solid ${tokens.colorNeutralStroke1}`,
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
});

export const TableColumnNode = (props) => {
  const { data } = props;
  const [selectedColumn, setSelectedColumn] = useState("");

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
