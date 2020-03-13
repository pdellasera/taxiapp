const plugdo = require("plugdo-node").node();
const path = require("path");
const expressLocale = require("express-locale");
const lang = require("./lang/languages");
const globalPath = process.env.PLUGDO_GLOBAL_PATH || "./source/app.config.js";
global.settings = require(globalPath).settings()[process.env.PLUGDO_GLOBAL_ENV || 'dev'];
const port = process.env.PORT === undefined ? 5000 : process.env.PORT;
// // Register the connectors here!t

const myDatabaseConnector = require("mysql-connector-plugdo-js/mysql");
plugdo.registerConnector("db", "mysql", myDatabaseConnector.mysql());

var location = "";
global.config = {
  lang: lang.get(),
  location: location,
};

// app.use((req, res, next) => {
//   if (req.header('x-forwarded-proto') !== 'https'   &&  process.env.PORT  )
//     res.redirect(`https://${req.header('host')}${req.url}`);
//   else
//     next();
// });
mvc.middlewareBefore.push(expressLocale({
  "priority": ["cookie", "accept-language", "default"],
  "default": "en-GB"
}));


plugdo.start(port, path.resolve(__dirname));