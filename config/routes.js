const { userExist, tokenVerification } = require("../customMiddleware");

const { userRouter, accountRouter, projectsRouter } = require("../routes");

const root = (req, res) => {
  res.send("sanity check");
};

module.exports = (server, router) => {
  server.use("/api/users", userRouter(router));
  server.use("/api/projects", projectsRouter(router));
  server.use("/api/account", tokenVerification, accountRouter(router));
  server.get("/", root);
};
