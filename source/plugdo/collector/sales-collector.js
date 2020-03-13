var connectionString = global.settings.db;

//***************************************//
// ------    COLLECTOR SALES     -------//
//*************************************//
plugdo.collector("getStartSalesData", {
  type: "db",
  action: "mysql",
  server: connectionString,
  queryType: "stored-procedure",
  query: "CALL dbsp_GetStartSales",
  parameter: ['json:sessionID']
});
