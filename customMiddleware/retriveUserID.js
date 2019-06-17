const data = require("../routes/users/userModel");

const retriveUserID = async (req, res, next) => {
  const userSub = req.sub;

  try {
    const user = await data.findAuthorizedUser(userSub);

    if (!user) {
      next();
    } else {
      const userID = user.id;
      const userRole = user.role;
      req.userID = userID;
      req.userRole = userRole;
      next();
    }
  } catch (err) {
    throw err;
    // next();
  }
};

module.exports = {
  retriveUserID
};
