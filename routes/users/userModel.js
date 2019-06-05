const db = require("../../data/dbConfig.js");

module.exports = {
  findUsers,
  findAuthorizedUser
};

function findUsers() {
  return db("users").select("id", "firstName", "lastName", "email", "role");
}

function findAuthorizedUser() {
  return db("users")
    .where({ id })
    .select("id", "firstName", "lastName", "email", "role")
    .first();
}
