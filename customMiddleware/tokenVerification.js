const jwt_decode = require("jwt-decode");

const tokenVerification = async (req, res, next) => {
  try {
    const token = await jwt_decode(req.headers.authorization);
    console.log("token in token verifcation", token);
    const { sub, picture } = token;
    req.sub = sub;
    req.picture = picture;
    next();
  } catch (error) {
    console.log("token: ", token, "sub: ", sub, "error: ", error);
  }
};

module.exports = {
  tokenVerification
};
