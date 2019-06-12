const data = require("../routes/users/userModel");

const retriveUserID = async (req, res, next) => {
  const userSub = req.sub;
  console.log(userSub, "userSub CUSTOM MW");
  try {
    const user = await data.findAuthorizedUser(userSub);

    if (!user) {
      console.log("1 next");
      next();
    } else {
      const userID = user.id;
      const userRole = user.role;
      req.userID = userID;
      req.userRole = userRole;
      console.log("2 next", userID);
      next();
    }
  } catch (err) {
    // console.log("3 next", err);
    // next();
  }
};

module.exports = {
  retriveUserID
};
