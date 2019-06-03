const testAdminRoute = async (req, res) => {
    res.send("I am a developer and I work, nice");
  },
  createAdmin = async (req, res) => {
    res.send("endpoint to create new admin role");
  },
  adminSignIn = async (req, res) => {
    res.send("endpoint for admin to sign in");
  },
  adminDashboard = async (req, res) => {
    res.send("endpoint to send related data to admins dashboard");
  },
  adminProjectView = async (req, res) => {
    res.send("endpoint for admin to view specific project");
  },
  adminProjectUpdate = async (req, res) => {
    res.send("endpoint for admin to update status of project");
  },
  adminPaymentProcess = async (req, res) => {
    res.send("endpoint for admin to process payment for project");
  };

module.exports = router => {
  router.get("/test-admin", testAdminRoute);
  router.post("/create-admin", createAdmin);
  router.post("/sign-in", adminSignIn);
  router.get("/dashboard", adminDashboard);
  router.get("/project-view/:project-id", adminProjectView);
  router.put("/project-status-update/:project-id", adminProjectUpdate);
  router.post("/process-payment/:project-id", adminPaymentProcess);

  return router;
};
