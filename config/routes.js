const {
  userRouter,
  accountRouter,
  generalRouter,
  projectsRouter
} = require("../routes");

const root = (req, res) => {
  res.send("sanity check");
};

module.exports = (server, router) => {
  server.use("/api/user", userRouter(router));
  server.use("/api/account", accountRouter(router));
  server.use("/api/general", generalRouter(router));
  server.use("/api/projects", projectsRouter(router));
  server.get("/", root);
};
