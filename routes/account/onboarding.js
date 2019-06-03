const testOnboardingRoute = (req, res) => {
    console.log("here in onboarding, looks like it works");
    res.send("I am a new user signing up");
  },
  userSignUp = async (req, res) => {
    res.send("endpoint to sign up new user");
  },
  checkIfLoggedIn = async (req, res) => {
    res.send(
      "endpoint to see if user is logged in if no roleType on client, if logged in return role, if not route to signup"
    );
  };

module.exports = router => {
  router.get("/test-onboarding", testOnboardingRoute);
  router.post("/signup", userSignUp);
  router.get("/isLogged", checkIfLoggedIn);

  return router;
};
