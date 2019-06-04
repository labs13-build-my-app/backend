const testDeveloperRoute = (req, res) => {
    console.log("here in developer, looks like it works");
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
  router.get("/dashboard-developer", developerDashboard);
  router.put("/update-profile-developer", updateDeveloper);
  router.delete("/delete-profile-developer", deleteDeveloper);
  router.post("/submit-plan-developer", submitPlan);
  router.put("/update-plan-developer", updatePlan);
  router.delete("/delete-plan-developer", deletePlan);
  router.post("/message-developer", messageProjectOwner);

  return router;
};
