const configureMiddleware = require("../config/middleware");
const configureRoutes = require("../config/routes");

module.exports = (server, express) => {
  configureMiddleware(server, express);
  configureRoutes(server, express.Router());
};
