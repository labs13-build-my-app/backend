const userRouter = require("./users");
const projectsRouter = require("./projects");
const accountRouter = require("./account");
const planRouter = require("./plans");
const messageRouter = require("./mailer");

module.exports = {
  userRouter,
  projectsRouter,
  accountRouter,
  planRouter,
  messageRouter
};
