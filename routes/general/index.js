const testingGeneralRouter = (req, res) => {
  res.send("testing general route, looks like it works");
};

module.exports = router => {
  router.get("/test-general", testingGeneralRouter);

  return router;
};
