const data = require("./userModel");

const allUsers = async (req, res) => {
    try {
      const users = await data.findUsers();
      if (users.length) {
        res.status(200).json({
          error: false,
          message: "The users were found in the database",
          users
        });
      } else {
        res.status(404).json({
          error: true,
          users: [],
          message: "The users could not be found in the database."
        });
      }
    } catch (error) {
      res.status(500).json({
        message: `User request failed ${error.message}.`
      });
    }
  },
  listDevelopers = async (req, res) => {
    res.send("endpoint to retrieve developer users");
  },
  listProjectOwners = async (req, res) => {
    res.send("endpoint to to retrieve project owners");
  },
  viewDeveloper = async (req, res) => {
    res.send("endpoint to view a developers page");
  },
  viewProjectOwner = async (req, res) => {
    res.send("endpoint to view a project owners page");
  };

module.exports = router => {
  router.get("/list-all-users", allUsers);
  router.post("/developers", listDevelopers); // post for filter or search // get for latest singup developer
  router.post("/project-owners", listProjectOwners); // post for filter or search // get for latest singup project owners
  router.get("/developer/:developer-id", viewDeveloper);
  router.get("/project-owner/:project-owner-id", viewProjectOwner);

  return router;
};
