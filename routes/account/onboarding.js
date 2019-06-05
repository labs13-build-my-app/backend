const jwt_decode = require("jwt-decode");
const testOnboardingRoute = (req, res) => {
    console.log("here in onboarding, looks like it works");
    res.send("I am a new user signing up");
  },
  userSignUp = async (req, res) => {
    res.send("endpoint to sign up new user");
  },
  checkIfLoggedIn = async (req, res) => {
    console.log(jwt_decode(req.headers.authorization));
    res.status(200).json({ role: "Admin", id: 1 });
  };

module.exports = router => {
  router.get("/test-onboarding", testOnboardingRoute);
  router.post("/signup", userSignUp);
  router.get("/login", checkIfLoggedIn);

  return router;
};
