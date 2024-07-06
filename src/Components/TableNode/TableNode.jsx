import React, { useState, useEffect } from "react";
import { makeStyles, mergeClasses } from "@fluentui/react-components";

import { markdown } from "../../Helpers";

import "@reactflow/node-resizer/dist/style.css";
import { TableColumn } from "../TableColumn/TableColumn";

const useStyles = makeStyles({
  table: {
    backgroundColor: "#FFF",
  },
  tableName: {
    position: "relative",
    padding: "8px",
    border: 0,
    borderRadius: "4px 4px 0 0",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableColumns: {
    border: "1px solid #CBD2D9",
    borderTop: 0,
    borderRadius: "0 0 4px 4px",
  },
  tableDescription: {
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
    backgroundColor: "#FFF",
    fontWeight: "normal",
    textAlign: "left",
    ":after": {
      position: "absolute",
      top: "50%",
      right: "100%",
      transform: "translateX(-0) translateY(-50%)",
      borderWidth: "3px",
      borderStyle: "solid",
      borderColor: "transparent #FFF transparent transparent",
      content: '""',
    },
    ":before": {
      position: "absolute",
      top: "50%",
      right: "100%",
      transform: "translateX(-0.5px) translateY(-50%)",
      borderWidth: "4px",
      borderStyle: "solid",
      borderColor: "transparent #CBD2D9 transparent transparent",
      content: '""',
    },
  },
  tableDescriptionActive: {
    display: "block",
  },
});

export const TableNode = (props) => {
  const { data } = props;
  const [selectedColumn, setSelectedColumn] = useState("");
  const [showDescription, setshowDescription] = useState(false);
  const [descriptionOnHoverActive, setDescriptionOnHoverActive] =
    useState(false);

  const styles = useStyles();

  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.code === "MetaLeft") {
          setDescriptionOnHoverActive(true);
        }
      },
      false
    );

    document.addEventListener(
      "keyup",
      (e) => {
        if (e.code === "MetaLeft") {
          setDescriptionOnHoverActive(false);
        }
      },
      false
    );
  }, []);

  return (
    <div className={styles.table}>
      <div
        style={{ backgroundColor: data.schemaColor }}
        className={styles.tableName}
        onMouseEnter={() => {
          if (descriptionOnHoverActive) {
            setshowDescription(true);
          }
        }}
        onMouseLeave={() => setshowDescription(false)}
      >
        {data.schema ? `${data.schema}.${data.name}` : data.name}

        <div
          className={mergeClasses(
            styles.tableDescription,
            showDescription && styles.tableDescriptionActive
          )}
          dangerouslySetInnerHTML={{
            __html: markdown(data.description || "No description."),
          }}
        />
      </div>

      <div className={styles.tableColumns}>
        {data.columns.map((column, index) => (
          <TableColumn
            key={index}
            column={column}
            selectedColumn={selectedColumn}
            descriptionOnHoverActive={descriptionOnHoverActive}
            setSelectedColumn={setSelectedColumn}
          />
        ))}
      </div>
    </div>
  );
};
