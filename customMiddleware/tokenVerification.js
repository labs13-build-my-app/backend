const jwt_decode = require("jwt-decode");

const tokenVerification = async (req, res, next) => {
  const token = jwt_decode(req.headers.authorization);

  const { sub } = token;
  console.log(sub);
  req.sub = sub;
  next();
};

module.exports = {
  tokenVerification
};
