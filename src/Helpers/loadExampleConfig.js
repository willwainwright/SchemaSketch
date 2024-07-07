import { fullTableName } from "./fullTableName";
import edgeConfigs from "../data/ExampleData/edges.json";
import tablePositions from "../data/ExampleData/tablePositions.json";
import schemaColors from "../data/ExampleData/schemaColors.json";
import tables from "../data/ExampleData/tables";

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
