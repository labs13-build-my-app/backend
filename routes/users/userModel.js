const db = require("../../data/dbConfig.js");

module.exports = {
  findUsers,
  findAuthorizedUser,
  createNewUser
};

function findUsers() {
  return db("users").select("id", "firstName", "lastName", "email", "role");
}

function findAuthorizedUser(userID) {
  const sub = userID;
  console.log(sub, userID);
  return db("users")
    .where({ sub })
    .select("id", "firstName", "lastName", "email", "role")
    .first();
}

function createNewUser(user) {
  console.log(user, "in user model");
  return db("users").insert(user, "id");
}
