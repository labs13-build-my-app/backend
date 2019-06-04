const testAdminRoute = async (req, res) => {
    console.log("here in admin, looks like it works");
    res.send("I am an admin, nice");
  },
  createAdmin = async (req, res) => {
    // req suggested data schema
    // username

    // res suggested data schema
    // id, role
    // client redirects to dashboard component
    res.send("endpoint to create new admin role");
  },
  adminSignIn = async (req, res) => {
    // req suggested data schema
    // username

    // res suggested data schema
    // id, role
    // client redirects to dashboard component

    res.send("endpoint for admin to sign in");
  },
  adminDashboard = async (req, res) => {
    // dashboard sends req on first render
    // req suggested data schema
    // token on header

    // res suggested data schema
    // projects: [] -- starting from que, first in first out
    // messages: [] -- starting from stack, first in last out

    res.send("endpoint to send related data to admins dashboard");
  },
  adminProjectView = async (req, res) => {
    // sends req on client route to project id
    // read parameter from url to get project id

    // full proposal from proposal table
    res.send("endpoint for admin to view specific project");
  },
  adminProjectUpdate = async (req, res) => {
    // sends req on client route to project id
    // read parameter from url to get project id

    // full proposal from proposal table

    res.send("endpoint for admin to update status of project");
  },
  adminPaymentProcess = async (req, res) => {
    // this maybe a stretch endpoint
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
