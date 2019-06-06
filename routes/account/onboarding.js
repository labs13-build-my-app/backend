const { createNewUser } = require("../users/userModel");

const testOnboardingRoute = (req, res) => {
    console.log("here in onboarding, looks like it works");
    res.send("I am a new user signing up");
  },
  userSignUp = async (req, res) => {
    const { user_id: sub } = req;
    const {
      role,
      firstName,
      lastName,
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
      skills,
      devType,
      linkedIn,
      gitHub,
      twitter
    })
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({ message: err });
      });
  },
  checkIfLoggedIn = async (req, res) => {
    console.log(req.user_id);

    // res.status(200).json({ role: "Admin", id: 1 });
    res.status(500).json();
  };

module.exports = router => {
  router.get("/test-onboarding", testOnboardingRoute);
  router.post("/signup", userSignUp);
  router.get("/login", checkIfLoggedIn);

  return router;
};
