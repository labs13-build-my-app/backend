const testDeveloperRoute = (req, res) => {
    res.send("I am a developer and I work, nice");
  },
  developerDashboard = (req, res) => {
    res.send("endpoint for developers account dashboard");
  },
  updateDeveloper = (req, res) => {
    res.send("endpoint to update developers account");
  },
  deleteDeveloper = (req, res) => {
    res.send("endpoint to delete developer account");
  },
  submitPlan = (req, res) => {
    res.send("endpoint to submit a plan to a project owners proposal");
  },
  updatePlan = (req, res) => {
    res.send("endpoint to update developers plan to submitted proposal");
  },
  deletePlan = (req, res) => {
    res.send("endpoint to delete developers plan");
  },
  messageProjectOwner = (req, res) => {
    res.send("endpoint to message a project owner or maybe admin");
  };

module.exports = router => {
  router.get("/test-developer", testDeveloperRoute);
  router.get("/dashboard", developerDashboard);
  router.put("/update-profile", updateDeveloper);
  router.delete("/delete-profile", deleteDeveloper);
  router.post("/submit-plan", submitPlan);
  router.put("/update-plan", updatePlan);
  router.delete("/delete-plan", deletePlan);
  router.post("/message", messageProjectOwner);

  return router;
};
