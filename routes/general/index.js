// const { verify } = require("../../middleware");

const testingGeneralRouter = (req, res) => {
  console.log(req.user_id);
  res.send("testing general route, looks like it works");
};

module.exports = router => {
  router.get("/test-general", testingGeneralRouter);

  return router;
};
