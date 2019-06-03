// require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID =
    "177270465698-tbnm6os1224qjrkdrhvkrnqrhgftfu96.apps.googleusercontent.com",
  client = new OAuth2Client(CLIENT_ID);

const verify = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) next();

  try {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
      }),
      payload = ticket.getPayload(),
      user_id = payload["sub"];

    req.user_id = user_id;
    next();
  } catch (err) {}
};
// verify().catch(console.error);

// Specify the CLIENT_ID of the app that accesses the backend
// Or, if multiple clients access the backend:
//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]

module.exports = {
  verify
};
