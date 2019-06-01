const { userRouter } = require("../routes");

const root = (req, res) => {
  res.send("sanity check");
};

module.exports = (server, express) => {
  server.use("/api/user", userRouter(express.Router()));
  server.get("/", root);
};
