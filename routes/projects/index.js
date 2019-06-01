const testingProjectsRouter = (req, res) => {
  res.send("testing projects route, looks like it works");
};

module.exports = router => {
  router.get("/test-projects", testingProjectsRouter);

  return router;
};
