const jwt_decode = require("jwt-decode");
const testOnboardingRoute = (req, res) => {
    console.log("here in onboarding, looks like it works");
    res.send("I am a new user signing up");
  },
  userSignUp = async (req, res) => {
    const token = jwt_decode(req.headers.authorization);
    const userObj = { ...req.body, sub: token.sub };
    console.log(userObj);
    res.status(200).json({ role: userObj.role });
  },
  checkIfLoggedIn = async (req, res) => {
    console.log(jwt_decode(req.headers.authorization));
    try {
      res.status(200).json({ id: 2, role: "Developer", firstName: "Random" });
    } catch (err) {
      console.log(err);
    }
  };

module.exports = router => {
  router.get("/test-onboarding", testOnboardingRoute);
  router.post("/signup", userSignUp);
  router.get("/login", checkIfLoggedIn);

  return router;
};
