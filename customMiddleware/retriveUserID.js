const data = require("../routes/users/userModel");

const retriveUserID = async (req, res, next) => {
  const userSub = req.user_id;
  try {
    const user = await data.findAuthorizedUser(userSub);
    const userID = user.id;
    if (!user) {
      next();
    }
    req.userID = userID;
    next();
  } catch (err) {
    next();
  }
};

module.exports = {
  retriveUserID
};
