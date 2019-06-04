const admin = require("./admin");
const projectOwner = require("./projectOwner");
const developer = require("./developer");
const onboarding = require("./onboarding");

module.exports = router => {
  router.use("/admin", admin(router));
  router.use("/project-owner", projectOwner(router));
  router.use("/developer", developer(router));
  router.use("/onboarding", onboarding(router));

  return router;
};
