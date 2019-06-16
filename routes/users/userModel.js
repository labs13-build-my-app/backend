const db = require("../../data/dbConfig.js");

module.exports = {
  findUsers,
  findAuthorizedUser,
  createNewUser,
  findDevUsers,
  findDevUserByID,
  findUserById,
  updateUser,
  listDevelopers
};

function findUserById(user_id) {
  return db("users")
    .where({ id: user_id })
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

function findUsers() {
  return db("users").select("id", "firstName", "lastName", "email", "role");
}

function findAuthorizedUser(userID) {
  const sub = userID;
  console.log(sub, userID);
  const result = db("users")
    .where({ sub })
    .first();
  return result;
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

function listDevelopers(page = 1) {
  const size = 5;
  return db("users")
    .where({ role: "Developer" })
    .limit(size)
    .offset(page * size);
}

function findDevUserByID(id) {
  return db("users")
    .where({ role: "Developer", id })
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

async function updateUser(user, id) {
  const editedUser = await db("users")
    .where({ id })
    .update(user);
  if (editedUser) {
    const updatedUser = await findUserById(id);
    return updatedUser;
  }
}

// add function to find not logged in user
