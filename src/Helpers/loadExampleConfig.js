import { fullTableName } from "./fullTableName";
import edgeConfigs from "../ExampleData/edges.json";
import tablePositions from "../ExampleData/tablePositions.json";
import schemaColors from "../ExampleData/schemaColors.json";
import tables from "../ExampleData/tables";

export const loadExampleConfig = async () => {
  edgeConfigs.forEach((edgeConfig) => {
    const sourceTableName = fullTableName(edgeConfig.source);
    const targetTableName = fullTableName(edgeConfig.target);

    edgeConfig.source = sourceTableName;
    edgeConfig.target = targetTableName;
  });

  tables.forEach((table) => {
    table.schemaColor = schemaColors[table.schema || "DEFAULT"];
  });

  return {
    tables,
    tablePositions,
    edgeConfigs,
    schemaColors,
  };
};
