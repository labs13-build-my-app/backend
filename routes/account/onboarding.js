const { createNewUser, findAuthorizedUser } = require("../users/userModel");

const testOnboardingRoute = (req, res) => {
    console.log("here in onboarding, looks like it works");
    res.send("I am a new user signing up");
  },
  userSignUp = async (req, res) => {
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
      twitter
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
        twitter
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
            twitter
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
    const { user_id } = req;
    console.log("USER ID IS", user_id);
    try {
      const user = await findAuthorizedUser(user_id);
      if (!user) {
        res.status(200).json({ message: "please signup" });
      }
      if (user) {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = router => {
  router.get("/test-onboarding", testOnboardingRoute);
  router.post("/signup", userSignUp);
  router.get("/login", userLogin);

  return router;
};
