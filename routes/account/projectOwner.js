const testProjectOwnerRoute = (req, res) => {
  res.send("I am a developer and I work, nice");
};

module.exports = router => {
  router.get("/test-project-owner", testProjectOwnerRoute);

  return router;
};
