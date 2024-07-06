export const fullTableName = (tableName, schemaName = "public") => {
  if (tableName.includes(".")) {
    return tableName;
  } else {
    return `${schemaName}.${tableName}`;
  }
};
