const { retriveUserID, tokenVerification } = require("../customMiddleware");

const {
  userRouter,
  accountRouter,
  projectsRouter,
  planRouter,
  messageRouter
} = require("../routes");

const root = async (req, res) => {
  res.send("sanity check");
};

module.exports = (server, router) => {
  server.use("/api/message", messageRouter(router));
  server.use("/api/users", userRouter(router));
  server.use("/api/projects", projectsRouter(router));
  server.use(
    "/api/account",
    tokenVerification,
    retriveUserID,
    accountRouter(router)
  );
  server.use("/api/plans", planRouter(router));

  server.get("/", root);
};
