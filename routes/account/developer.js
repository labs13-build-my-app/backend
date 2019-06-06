const data = require("../users/userModel");

const testDeveloperRoute = (req, res) => {
    console.log("here in developer, looks like it works");
    res.send("I am a developer and I work, nice");
  },
  developerDashboard = (req, res) => {
    const id = req.params.id;
    data
      .findAuthorizedUser()
      .then(user => {
        res.status(200).json({
          user,
          error: false,
          message: "The user were found in the database"
        });
      })
      .catch(err => {
        res.status(500).json({
          message: `User request failed ${error.message}.`
        });
      });
  },
  updateDeveloper = (req, res) => {
    res.send("endpoint to update developers account");
  },
  deleteDeveloper = (req, res) => {
    res.send("endpoint to delete developer account");
  },
  submitPlan = (req, res) => {
    res.send("endpoint to submit a plan to a project owners project");
  },
  updatePlan = (req, res) => {
    res.send("endpoint to update developers plan to submitted project");
  },
  deletePlan = (req, res) => {
    res.send("endpoint to delete developers plan");
  },
  messageProjectOwner = (req, res) => {
    res.send("endpoint to message a project owner or maybe admin");
  };

module.exports = router => {
  router.get("/test-developer", testDeveloperRoute);
  router.get("/dashboard-developer/:id", developerDashboard);
  router.put("/update-profile-developer", updateDeveloper);
  router.delete("/delete-profile-developer", deleteDeveloper);
  router.post("/submit-plan-developer", submitPlan);
  router.put("/update-plan-developer", updatePlan);
  router.delete("/delete-plan-developer", deletePlan);
  router.post("/message-developer", messageProjectOwner);

  return router;
};
