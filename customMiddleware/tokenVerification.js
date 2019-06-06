// require("dotenv").config();
const jwt_decode = require("jwt-decode");

// const CLIENT_ID =
//     "177270465698-tbnm6os1224qjrkdrhvkrnqrhgftfu96.apps.googleusercontent.com",
//   client = new OAuth2Client(CLIENT_ID);

const tokenVerification = async (req, res, next) => {
  const token = jwt_decode(req.headers.authorization);
  //   const token = req.headers.authorization;

  const { sub } = token;
  console.log(sub);
  req.user_id = sub;
  next();

  //   if (!token) next();

  //   try {
  //     const ticket = await client.tokenVerificationIdToken({
  //         idToken: token,
  //         audience: CLIENT_ID
  //       }),
  //       payload = ticket.getPayload(),
  //       user_id = payload["sub"];

  //     req.user_id = user_id;
  //     next();
  //   } catch (err) {}
};
// tokenVerification().catch(console.error);

// Specify the CLIENT_ID of the app that accesses the backend
// Or, if multiple clients access the backend:
//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]

module.exports = {
  tokenVerification
};
