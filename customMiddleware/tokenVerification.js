const jwt_decode = require("jwt-decode");

const tokenVerification = async (req, res, next) => {
  try {
    const token = await jwt_decode(req.headers.authorization);

    const { sub, picture } = token;
    req.sub = sub;
    req.picture = picture;
    next();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  tokenVerification
};
