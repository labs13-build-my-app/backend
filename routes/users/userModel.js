const db = require("../../data/dbConfig.js");
const moment = require("moment");

module.exports = {
  activityUpdate,
  findUserById,
  findUsers,
  findAuthorizedUser,
  createNewUser,
  findDevUsers,
  listDevelopers,
  findDevUserByID,
  updateUser,
  findUsersEmail
};

// when client fetchers for user info updated_field is updated if greater then set time
// protected route
async function activityUpdate(id) {
  try {
    const user = await db("users")
      .where({ id })
      .first();

    const time = new Date(user.updated_at).getTime();
    const date = new Date(moment().format("YYYY-MM-DD hh:mm:ss")).getTime();
    if (date - time > 5) {
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

// find user by id
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
      "linkedIn",
      "profile_picture_url"
    )
    .first();
}

// test function has no purpose for the app
function findUsers() {
  return db("users").select("id", "firstName", "lastName", "email", "role");
}

// find logged in user by sub
// protected route
function findAuthorizedUser(sub) {
  return db("users")
    .where({ sub })
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

// create a new user
// protected route
function createNewUser(user) {
  return db("users").insert(user, "id");
}

// list of developers, deprecated, use listDevelopers
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

// list of developers, results are paginated and order by most resent updated activity
async function listDevelopers(
  page = 1,
  per = 16,
  total_pages,
  update_pages,
  type
) {
  try {
    if (per !== 0) {
      const developers = await db("users")
        .where({ role: "Developer" })
        .andWhere(dev => {
          console.log(type);
          if (type !== "All") {
            console.log("here");
            return dev.where({ devType: type });
          }

          return dev;
        })
        .orderBy("updated_at", "desc")
        .limit(per)
        .offset((page - 1) * per)
        .select(
          "id",
          "firstName",
          "lastName",
          "devType",
          "profile_picture_url",
          "skills",
          "updated_at"
        );

      if (total_pages || update_pages === false) {
        const has_more = page < total_pages ? true : false;
        return { per, page, total_pages, has_more, developers };
      } else {
        const developersList = await db("users")
          .where({
            role: "Developer"
          })
          .andWhere(dev => {
            console.log(type);
            if (type !== "All") {
              console.log("here");
              return dev.where({ devType: type });
            }

            return dev;
          });
        const total = developersList.length;
        total_pages = Math.ceil(total / per);
        const has_more = page < total_pages ? true : false;
        return { per, page, total_pages, has_more, developers };
      }
    } else {
      const developers = await db("users")
        .where({
          role: "Developer"
        })
        .andWhere(dev => {
          console.log(type);
          if (type !== "All") {
            console.log("here");
            return dev.where({ devType: type });
          }

          return dev;
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

// find developer by id
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

// update user information
// protected route
async function updateUser(user, id) {
  const editedUser = await db("users")
    .where({ id })
    .update(user);
  if (editedUser) {
    const updatedUser = await findUserById(id);
    return updatedUser;
  }
}

async function findUsersEmail(loggedInUserID, userID) {
  console.log("USER");
  // const loggedInUserInfo = await db("users")
  //   .where({ id: loggedInUserID })
  //   .select("users.id", "users.firstName", "users.lastName", "users.email");
  // const userInfo = await db("users")
  //   .where({ id: userID })
  //   .select("users.id", "users.firstName", "users.lastName", "users.email");
  // return { loggedInUserInfo: loggedInUserInfo, userInfo: userInfo };
}
