const {
  mongodb
} = require("plugdo-mongo");

mvc.dependencies.userTable = function () {
  var schema = {
    "_id": {
      required: false,
      unique: true
    },
    title: {
      required: true,
      typeof: "string",
      min: 4,
      code: 550
    },
    description: {
      required: true,
      typeof: "string",
      min: 4,
      code: 560
    },
    priority: {
      required: true,
      typeof: "string",
      code: 570
    }
  };

  var table = mongodb.server(config.mongo.connection)
    .db(config.mongo.dbSession)
    .table(schema, "table");

  return table;
}