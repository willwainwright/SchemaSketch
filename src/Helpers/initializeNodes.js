import { fullTableName } from "./fullTableName";

const setHandleType = (tableConfigs, tableName, columnName, handleType) => {
  tableConfigs.forEach((tableConfig) => {
    const configTableName = fullTableName(
      tableConfig.name,
      tableConfig.schema || "public"
    );

    if (configTableName === tableName) {
      tableConfig.columns.forEach((columnConfig) => {
        if (columnConfig.name === columnName) {
          columnConfig.handleType = handleType;
        }
      });
    }
  });
};

export const initializeNodes = (databaseConfig, nodesCollapsed) => {
  const tables = [];
  const tablePositionsWithSchema = {};

  Object.entries(databaseConfig.tablePositions).forEach((params) => {
    const tableName = params[0];
    const position = params[1];

    if (tableName.includes(".")) {
      tablePositionsWithSchema[tableName] = position;
    } else {
      tablePositionsWithSchema[fullTableName(tableName)] = position;
    }
  });

  databaseConfig.edgeConfigs.forEach((edgeConfig) => {
    const sourceTableName = fullTableName(edgeConfig.source);
    setHandleType(
      databaseConfig.tables,
      sourceTableName,
      edgeConfig.sourceKey,
      "source"
    );

    const targetTableName = fullTableName(edgeConfig.target);
    setHandleType(
      databaseConfig.tables,
      targetTableName,
      edgeConfig.targetKey,
      "target"
    );
  });

  databaseConfig.tables.forEach((tableConfig) => {
    const schemaName = tableConfig.schema || "public";
    const tableID = fullTableName(tableConfig.name, schemaName);

    const nodeType = nodesCollapsed ? "tableCollapsed" : "table";

    const tableDefinition = {
      id: tableID,
      data: tableConfig,
      position: tablePositionsWithSchema[tableID] || { x: 0, y: 0 },
      type: nodeType,
    };

    tables.push(tableDefinition);
  });

  return tables;
};
