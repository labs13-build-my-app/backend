const testAdminRoute = async (req, res) => {
    console.log("here in admin, looks like it works");
    res.send("I am an admin, nice");
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
  router.get("/dashboard-admin", adminDashboard);
  router.get("/project-view/:project-id", adminProjectView);
  router.put("/project-status-update/:project-id", adminProjectUpdate);
  router.post("/process-payment/:project-id", adminPaymentProcess);

  return router;
};
