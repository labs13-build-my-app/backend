const data = require("../users/userModel");

// admin not in use atm

const testAdminRoute = async (req, res) => {
    console.log("here in admin, looks like it works");
    res.send("I am an admin, nice");
  },
  // not sure of this route, might hard code admin
  createAdmin = async (req, res) => {
    // req suggested data schema
    // username

    // res suggested data schema
    // id, role
    // client redirects to dashboard component
    res.send("endpoint to create new admin role");
  },
  // route for admin to sign in and retrive amdin profile
  adminSignIn = async (req, res) => {
    // req suggested data schema
    // username

    // res suggested data schema
    // id, role
    // client redirects to dashboard component

    res.send("endpoint for admin to sign in");
  },
  // upload admin dashboard with dashboard info
  adminDashboard = async (req, res) => {
    const { user_id: sub } = req;
    console.log("sub from admin", sub);
    data
      .findAuthorizedUser(sub)
      .then(user => {
        console.log(user);
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
  // view project page for admin
  adminProjectView = async (req, res) => {
    // sends req on client route to project id
    // read parameter from url to get project id

    // full proposal from proposal table
    res.send("endpoint for admin to view specific project");
  },
  // not sure of this route
  adminProjectUpdate = async (req, res) => {
    // sends req on client route to project id
    // read parameter from url to get project id

    // full proposal from proposal table

    res.send("endpoint for admin to update status of project");
  },
  // priortize last
  adminPaymentProcess = async (req, res) => {
    // this maybe a stretch endpoint
    res.send("endpoint for admin to process payment for project");
  };

module.exports = router => {
  router.get("/test-admin", testAdminRoute);
  router.post("/create-admin", createAdmin);
  router.get("/sign-in", adminSignIn);
  router.get("/dashboard-admin", adminDashboard);
  router.get("/project-view/:id", adminProjectView);
  router.put("/project-status-update/:id", adminProjectUpdate);
  router.post("/process-payment/:id", adminPaymentProcess);

  return router;
};
