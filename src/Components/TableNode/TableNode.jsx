import React, { useState } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";

import { invertColor } from "../../helpers";

import "@reactflow/node-resizer/dist/style.css";
import { TableColumn } from "../TableColumn/TableColumn";
import { useTheme } from "../../context/ThemeContext";

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
  },
  tableColumns: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderTop: 0,
    borderRadius: "0 0 4px 4px",
  },
});

export const TableNode = (props) => {
  const { data } = props;
  const [selectedColumn, setSelectedColumn] = useState("");

  const styles = useStyles();
  const { isLightTheme } = useTheme();

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
