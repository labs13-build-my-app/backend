const admin = require("./admin");
const projectOwner = require("./projectOwner");
const developer = require("./developer");
const onboarding = require("./onboarding");

module.exports = router => {
  router.use("/admin", admin(router));
  router.use("/projectOwner", projectOwner(router));
  router.use("/developer", developer(router));
  router.use("/onbaording", onboarding(router));

  return router;
};
