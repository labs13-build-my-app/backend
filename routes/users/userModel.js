const db = require("../../data/dbConfig.js");

module.exports = {
  findUsers,
  findAuthorizedUser,
  createNewUser,
  findDevUsers,
  findDevUserByID
};

function findUsers() {
  return db("users").select("id", "firstName", "lastName", "email", "role");
}

function findAuthorizedUser(userID) {
  const sub = userID;
  // console.log(sub, userID);
  const result = db("users")
  .where({ sub })
  .first();
  return result
}

function createNewUser(user) {
  console.log(user, "in user model");
  return db("users").insert(user, "id");
}

function findDevUsers() {
  return db("users")
    .where({ role: "Developer" })
    .select(
      "id",
      "firstName",
      "lastName",
      "email",
      "skills",
      "role",
      "devType",
      "twitter",
      "gitHub",
      "linkedIn"
    );
}
function findDevUserByID(id) {
  return db("users")
    .where({ id })
    .select(
      "id",
      "firstName",
      "lastName",
      "email",
      "skills",
      "role",
      "devType",
      "twitter",
      "gitHub",
      "linkedIn"
    )
    .first();
}

// add function to find not logged in user
