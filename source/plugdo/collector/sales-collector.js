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


plugdo.collector("updateSales", {
  type: "db",
  action: "mysql",
  server: connectionString,
  queryType: "stored-procedure",
  query: "CALL dbsp_UpdateSales",
  parameter: ['json:salesID']
});

plugdo.collector("addSales", {
  type: "db",
  action: "mysql",
  server: connectionString,
  queryType: "stored-procedure",
  query: "CALL dbsp_AddSales",
  parameter: ['json:sessionID','json:cartID','json:customerName','json:customerEmail','json:customerPhone','json:details','json:paymentAmount','json:paymentMethod','json:brand','json:transactionID','json:salesStatus','json:paymentDatetime','json:Last4dig']
});

plugdo.collector("addSalesDetails", {
  type: "db",
  action: "mysql",
  server: connectionString,
  queryType: "stored-procedure",
  query: "CALL dbsp_AddSales",
  parameter: ['json:salesID','json:productID','json:productName','json:img','json:price','json:qty']
});