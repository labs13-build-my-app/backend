const db = require("../../data/dbConfig.js");
const moment = require("moment");

module.exports = {
  findUsers,
  findAuthorizedUser,
  createNewUser,
  findDevUsers,
  findDevUserByID,
  findUserById,
  updateUser,
  listDevelopers,
  activityUpdate
};

async function activityUpdate(id) {
  try {
    const user = await db("users")
      .where({ id })
      .first();

    const time = new Date(user.updated_at).getTime();
    const date = new Date(moment().format("YYYY-MM-DD hh:mm:ss")).getTime();
    if (date - time > 200000) {
      await db("users")
        .where({ id })
        .update({ updated_at: moment().format("YYYY-MM-DD hh:mm:ss") });
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
}

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

async function listDevelopers(page = 1, per = 15, total_pages, update_pages) {
  try {
    if (per !== 0) {
      const developers = await db("users")
        .where({ role: "Developer" })
        .orderBy("updated_at", "desc")
        .limit(per)
        .offset((page - 1) * per);

      if (total_pages || update_pages === false) {
        const has_more = page < total_pages ? true : false;
        return { per, page, total_pages, has_more, developers };
      }
      const developersList = await db("users").where({
        role: "Developer"
      });
      const total = developersList.length;
      total_pages = Math.ceil(total / per);
      const has_more = page < total_pages ? true : false;
      console.log(developers);
      return { per, page, total_pages, has_more, developers };
    } else {
      const developers = await db("users").where({
        role: "Developer"
      });
      return {
        per: null,
        page: 1,
        total_pages: 1,
        has_more: false,
        developers
      };
    }
  } catch (error) {
    throw error;
  }
}

// function listDevelopers(page = 1) {
//   const size = 5;
//   return db("users")
//     .where({ role: "Developer" })
//     .limit(size)
//     .offset(page * size);
// }

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
