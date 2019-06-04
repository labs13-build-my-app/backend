const { verify, userExist } = require("../customMiddleware");

const { userRouter, accountRouter, projectsRouter } = require("../routes");

const root = (req, res) => {
  res.send("sanity check");
};

module.exports = (server, router) => {
  server.use("/api/users", userRouter(router));
  server.use("/api/projects", projectsRouter(router));
  server.use("/api/account", verify, accountRouter(router));
  server.get("/", root);
};
