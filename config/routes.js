const userRouter = require("../routes/users/userRouter");

const getUsers = (req, res) => {
  res.send("sanity check");
};

module.exports = server => {
  server.use(getUsers);
  server.use("/api/user", userRouter);
};
