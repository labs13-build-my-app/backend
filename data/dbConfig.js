const knex = require("knex");
const config = reuqire("../knexfile.js");

const dbEnv = process.env.DB_ENV || "development";

module.exports = knex(config[dbEnv]);
