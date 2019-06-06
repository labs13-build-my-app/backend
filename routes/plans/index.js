const data = require("./planModel");

module.exports = router => {
  router.post("/test-plans/", (req, res) => {
    const request = req.body;
    data
      .addPlan(request)
      .then(project => {
        res.status(200).json(project);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  router.get("/test-getplans", (req, res) => {
    data
      .getPlans()
      .then(plans => {
        res.status(200).json(plans);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  router.get("/getplan/:id", (req, res) => {
    data
      .getPlanById()
      .then(plan => {
        res.status(200).json(plan);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  return router;
};
