const testingProjectsRouter = (req, res) => {
    res.send("testing projects route, looks like it works");
  },
  developersPlan = (req, res) => {
    res.send(
      "endpoint to retrieve developers plan to a project owners proopsal"
    );
  },
  projectOwnersProposal = (req, res) => {
    res.send("endpoint to retrieve a project owners proposal");
  };

module.exports = router => {
  router.get("/test-projects", testingProjectsRouter);
  router.get("/submitted-plan/:plan-id", developersPlan);
  router.get("/proposal/:proposal-id", projectOwnersProposal);

  return router;
};
