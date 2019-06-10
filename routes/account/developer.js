const data = require("../users/userModel");
// 1

const testDeveloperRoute = (req, res) => {
    console.log("here in developer, looks like it works");
    res.send("I am a developer and I work, nice");
  },
  developerDashboard = (req, res) => {
    const id = req.user_id;
    data
      .findAuthorizedUser(id)
      .then(user => {
        res.status(200).json({
          user,
          error: false,
          message: "The user was found in the database"
        });
      })
      .catch(err => {
        res.status(500).json({
          message: `User request failed ${error.message}.`
        });
      });
  },
  // prioritize last
  updateDeveloper = (req, res) => {
    res.send("endpoint to update developers account");
  },
  // prioritize last
  deleteDeveloper = (req, res) => {
    res.send("endpoint to delete developer account");
  },
  // page view to submit a plan
  submitPlan = (req, res) => {
    res.send("endpoint to submit a plan to a project owners project");
  },
  // prioritize last
  updatePlan = (req, res) => {
    res.send("endpoint to update developers plan to submitted project");
  },
  // prioritize last
  deletePlan = (req, res) => {
    res.send("endpoint to delete developers plan");
  },
  // prioritize last
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
