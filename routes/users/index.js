const data = require("./userModel");
// 3

const testingUsers = (req, res) => {
    console.log("here in users, looks like it works");
    res.send("testing users route, looks like it works");
  },
  // for testing
  allUsers = async (req, res) => {
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
  // searching for developers
  // implement pagination
  listDevelopers = async (req, res) => {
    try {
      data.findDevUsers().then(users => {
        res.status(200).json(users);
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
  // prioritize last
  // listProjectOwners = async (req, res) => {
  //   res.send("endpoint to to retrieve project owners");
  // },
  // developer page view
  viewDeveloper = async (req, res) => {
    const id = Number(req.params.id);
    try {
      data.findDevUserByID(id).then(dev => {
        const initials = dev.firstName.charAt(0) + dev.lastName.charAt(0);
        res.status(200).json({ ...dev, initials });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // project owner page view
  viewProjectOwner = async (req, res) => {
    res.send("endpoint to view a project owners page");
  };

module.exports = router => {
  router.get("/test-users", testingUsers);
  router.get("/list-all-users", allUsers);
  router.get("/developers", listDevelopers);
  // router.post("/project-owners", listProjectOwners);
  router.get("/developer/:id", viewDeveloper);
  router.get("/project-owner/:id", viewProjectOwner);

  return router;
};
