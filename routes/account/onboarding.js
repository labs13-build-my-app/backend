const userSignUp = async (req, res) => {
    res.send("endpoint to sign up new user");
  },
  checkIfLoggedIn = async (req, res) => {
    res.send(
      "endpoint to see if user is logged in if no roleType on client, if logged in return role, if not route to signup"
    );
  };

module.exports = router => {
  router.post("/signup", userSignUp);
  router.get("/isLogged", checkIfLoggedIn);

  return router;
};
