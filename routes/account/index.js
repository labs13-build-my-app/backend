const admin = require("./admin");
const projectOwner = require("./projectOwner");
const developer = require("./developer");

module.exports = router => {
  admin(router);
  projectOwner(router);
  developer(router);

  return router;
};
