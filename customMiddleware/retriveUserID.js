const data = require("../routes/users/userModel");

const retriveUserID = async (req, res, next) => {
  const userSub = req.sub;
  console.log(userSub, "userSub CUSTOM MW");
  try {
    const user = await data.findAuthorizedUser(userSub);
    const userID = user.id;
    const userRole = user.role;
    if (!user) {
      next();
    }
    req.userID = userID;
    req.userRole = userRole;
    next();
  } catch (err) {
    next();
  }
};

module.exports = {
  retriveUserID
};
