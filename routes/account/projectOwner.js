const testProjectOwnerRoute = (req, res) => {
    res.send("I am a developer and I work, nice");
  },
  projectOwnerDashboard = (req, res) => {
    res.send("endpoint for developers account dashboard");
  },
  updateProjectOwner = (req, res) => {
    res.send("endpoint to update developers account");
  },
  deleteProjectOwner = (req, res) => {
    res.send("endpoint to delete developer account");
  },
  createProposal = (req, res) => {
    res.send("endpoint to submit a plan to a project owners proposal");
  },
  updateProposal = (req, res) => {
    res.send("endpoint to update developers plan to submitted proposal");
  },
  deleteProposal = (req, res) => {
    res.send("endpoint to delete developers plan");
  },
  submitPayment = (req, res) => {
    res.send("endpoint for project owner to submit paymet to project");
  },
  messageDeveloper = (req, res) => {
    res.send("endpoint to message a project owner or maybe admin");
  };

module.exports = router => {
  router.get("/test-project-owner", testProjectOwnerRoute);
  router.get("/dashboard", projectOwnerDashboard);
  router.put("/update-profile", updateProjectOwner);
  router.delete("/delete-profile", deleteProjectOwner);
  router.post("/create-proposal", createProposal);
  router.put("/update-proposal", updateProposal);
  router.delete("/delete-proposal", deleteProposal);
  router.post("/submit-payment/:proposal-id", submitPayment);
  router.post("/message", messageDeveloper);

  return router;
};
