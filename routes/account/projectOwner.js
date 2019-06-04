const testProjectOwnerRoute = (req, res) => {
    console.log("here in project owner, looks like it works");
    res.send("I am a project owner, nice");
  },
  projectOwnerDashboard = (req, res) => {
    res.send("endpoint for project owner account dashboard");
  },
  updateProjectOwner = (req, res) => {
    res.send("endpoint to update project owner account");
  },
  deleteProjectOwner = (req, res) => {
    res.send("endpoint to delete project owner account");
  },
  createProposal = (req, res) => {
    res.send("endpoint to submit a plan to a project owners proposal");
  },
  updateProposal = (req, res) => {
    res.send("endpoint to update project owner proposal");
  },
  deleteProposal = (req, res) => {
    res.send("endpoint to delete project owners proposal");
  },
  submitPayment = (req, res) => {
    res.send("endpoint for project owner to submit paymet to project");
  },
  messageDeveloper = (req, res) => {
    res.send("endpoint to message a project owner or maybe admin");
  };

module.exports = router => {
  router.get("/test-project-owner", testProjectOwnerRoute);
  router.get("/dashboard-project-owner", projectOwnerDashboard);
  router.put("/update-profile-project-owner", updateProjectOwner);
  router.delete("/delete-profile-project-owner", deleteProjectOwner);
  router.post("/create-proposal-project-owner", createProposal);
  router.put("/update-proposal-project-owner", updateProposal);
  router.delete("/delete-proposal-project-owner", deleteProposal);
  router.post("/submit-payment/:proposal-id", submitPayment);
  router.post("/message-project-owner", messageDeveloper);

  return router;
};
