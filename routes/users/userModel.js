const db = require("../../data/dbConfig.js");

module.exports = {
  findUsers
};

function findUsers() {
  return db("users").select("id", "firstName", "lastName", "email");
}
