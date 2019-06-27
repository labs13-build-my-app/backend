const data = require("./userModel");

const // /api/users
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
  // developer list with pagination
  // order by most recent updated activity
  listPaginatedDevelopers = async (req, res) => {
    const { page, per, has_more, total_pages, update_pages, type } = req.query;

    try {
      if (has_more === false) {
        res
          .status(200)
          .json({ per, page, total_pages, has_more, developers: [] });
      } else {
        const developers = await data.listDevelopers(
          page,
          per,
          total_pages,
          update_pages,
          type
        );
        if (developers) {
          res.status(200).json(developers);
        } else {
          res.status(404).json({
            message: "The developers could not be found in the database."
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        message: `Developer request failed ${error.message}.`
      });
    }
  },
  // developer page view by id
  // not needed, all users are access through userById
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
  // project owner page view by id
  // not needed, all users are access through userById
  viewProjectOwner = async (req, res) => {
    res.send("endpoint to view a project owners page");
  },
  // find user by id
  userById = async (req, res) => {
    const { user_id } = req.params;
    console.log(user_id);
    data
      .findUserById(user_id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(error => {
        res.status(404).json(error);
      });
  },
  // is only a test function will be removed
  updateUser = (req, res) => {
    const { id } = req.body;

    data
      .activityUpdate(id)
      .then(updated => {
        res.status(200).json({ updated });
      })
      .catch(err => {
        res.status(404).json(err);
      });
  };

module.exports = router => {
  router.get("/profile/:user_id", userById); // <<< user profile page
  // router.get("/list-users", allUsers); // <<< list all users
  router.get("/list-developers", listPaginatedDevelopers); // <<< listing developers
  // router.get("/user-developer/:id", viewDeveloper); // <<< might not need this, we have profile endpoint now
  // router.get("/user-project-owner/:id", viewProjectOwner); // <<< might not need this, we have profile endpoing now
  router.put("/update-logged-user", updateUser); // <<< testing right now

  return router;
};
