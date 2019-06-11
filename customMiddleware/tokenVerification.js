const jwt_decode = require("jwt-decode");

const tokenVerification = async (req, res, next) => {
  const token = jwt_decode(req.headers.authorization);
  console.log("token in token verifcation", token);
  const { sub } = token;
  req.sub = sub;
  next();
};

module.exports = {
  tokenVerification
};
