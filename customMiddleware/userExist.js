// import user model

const userExist = async (req, res, next) => {
  const { user_id: id } = req;

  if (!id) next();

  try {
    // check user model for user
    // if user exist proceed to next()
    // if user doesn't exist proceed to next() and send response user dosen't exist, ask user to create account
  } catch (err) {
    // error something happen
  }
};

module.exports = {
  userExist
};

// user sign ups or user signs in
// user signs in with google
// client recieves information about user
// client saves user data to state
// client sends token to server
// server checks token for sub id
// if sub id
// -- check database for user
// -- if user exist
// --   -- server sends client user information
// -- if user not exist
// --   -- server sends client response to direct client to sign up user
// --   -- user selects role type
// --   -- onboard user
// --   -- client sends response to onboard route
// --   -- server saves user to database
// --   -- client routes user to database
// if no sub id
// --   server response to client invailed user, have user reattempt sign in
