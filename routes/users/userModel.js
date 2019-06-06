const db = require("../../data/dbConfig.js");

module.exports = {
  findUsers,
  findAuthorizedUser,
  createNewUser
};

function findUsers() {
  return db("users").select("id", "firstName", "lastName", "email", "role");
}

function findAuthorizedUser(userid) {
  const id = Number(userid.id);
  console.log(id, userid);
  return db("users")
    .where({ id })
    .select("id", "firstName", "lastName", "email", "role")
    .first();
}

function createNewUser(user) {
  console.log(user);
  return db("users").insert(user, "id");
}
