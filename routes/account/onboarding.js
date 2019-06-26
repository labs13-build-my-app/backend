const {
  createNewUser,
  findAuthorizedUser,
  activityUpdate
} = require("../users/userModel");

const userSignUp = async (req, res) => {
    console.log(req.body);
    const { sub } = req;
    const {
      role,
      firstName,
      lastName,
      email,
      skills,
      devType,
      linkedIn,
      gitHub,
      twitter,
      profile_picture_url
    } = req.body;

    if (role === "Developer" || role === "Project Owner") {
      createNewUser({
        sub,
        role,
        firstName,
        lastName,
        email,
        skills,
        devType,
        linkedIn,
        gitHub,
        twitter,
        profile_picture_url
      })
        .then(userid => {
          const id = userid[0];
          res.status(201).json({
            id,
            role,
            firstName,
            lastName,
            email,
            skills,
            devType,
            linkedIn,
            gitHub,
            twitter,
            profile_picture_url
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "unable to create user, please try again",
            error: err
          });
        });
    } else {
      res
        .status(200)
        .json({ message: "invalid user type, please submit valid user type" });
    }
  },
  userLogin = async (req, res) => {
    const { sub, picture } = req;
    try {
      const user = await findAuthorizedUser(sub);
      if (!user) {
        res.status(200).json({ message: "please signup" });
      }
      if (user) {
        activityUpdate(user.id);
        res.status(200).json({ ...user, picture });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = router => {
  router.post("/signup", userSignUp);
  router.get("/login", userLogin);

  return router;
};
