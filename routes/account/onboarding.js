const { createNewUser, findAuthorizedUser } = require("../users/userModel");

const testOnboardingRoute = (req, res) => {
    console.log("here in onboarding, looks like it works");
    res.send("I am a new user signing up");
  },
  userSignUp = async (req, res) => {
    const { user_id: sub } = req;
    console.log("here asdfa;ldkfj");
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
        res.status(500).json({ message: err });
      });
  },
  checkIfLoggedIn = async (req, res) => {
    const { user_id: sub } = req;
    console.log(sub, "checking login");
    findAuthorizedUser(sub)
      .then(user => {
        const userRole = user.role;
        console.log(user);
        res.status(200).json({ role: userRole });
      })
      .catch(err => {
        console.log("err here", err);
        res.status(500).json({ message: err });
      });
  };

module.exports = router => {
  router.get("/test-onboarding", testOnboardingRoute);
  router.post("/signup", userSignUp);
  router.get("/login", checkIfLoggedIn);

  return router;
};
