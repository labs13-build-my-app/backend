const testingProjectsRouter = (req, res) => {
    console.log("here in projects, looks like it works");
    res.send("testing projects route, looks like it works");
  },
  listDevelopersPlans = (req, res) => {
    res.send("endpoint to retrieve list of developer plans");
  },
  developersPlan = (req, res) => {
    res.send(
      "endpoint to retrieve developers plan to a project owners proopsal"
    );
  },
  listProjectOwnersProposals = (req, res) => {
    res.send("endpoint to retrieve list of project owner proposals");
  },
  projectOwnersProposal = (req, res) => {
    res.send("endpoint to retrieve a project owners proposal");
  };

module.exports = router => {
  router.get("/test-projects", testingProjectsRouter);
  router.get("/plan-list", listDevelopersPlans);
  router.get("/submitted-plan/:plan-id", developersPlan);
  router.get("/proposal-list", listProjectOwnersProposals);
  router.get("/proposal/:proposal-id", projectOwnersProposal);

  return router;
};
