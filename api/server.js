const express = require("express");
const serverConfig = require("../config");
const server = express();

serverConfig(server, express);

module.exports = {
  server
};
