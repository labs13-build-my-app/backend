// const data = require("./planModel");

// endpoints may need to be updated
// test endpoints
// move endoints to different files
// implement auth to endpoints that need auth

module.exports = router => {
  // requires developer auth
  // income data needs to be sanitize
  // router.post("/createplan", (req, res) => {
  //   const request = req.body;
  //   data
  //     .addPlan(request)
  //     .then(project => {
  //       res.status(200).json(project);
  //     })
  //     .catch(err => {
  //       res.status(500).json(err);
  //     });
  // });
  // this can be moved into projects endpoint in listdeveloperplans fucntion
  // router.get("/getplans", (req, res) => {
  //   data
  //     .getPlans()
  //     .then(plans => {
  //       res.status(200).json(plans);
  //     })
  //     .catch(err => {
  //       res.status(500).json(err);
  //     });
  // });
  // this can be moved into projects endpoint in developerplan function
  // router.get("/getplan/:id", (req, res) => {
  //   const id = req.params.id;
  //   data
  //     .getPlanById(id)
  //     .then(plan => {
  //       res.status(200).json(plan);
  //     })
  //     .catch(err => {
  //       res.status(500).json(err);
  //     });
  // });
  // this can moved into account for developers
  // requires auth
  // need to sanitize incoming data
  // router.put("/updateplan/:id", (req, res) => {
  //   const changes = req.body;
  //   const id = req.params.id;
  //   data
  //     .updatePlan(id, changes)
  //     .then(plan => {
  //       res.status(200).json(plan);
  //     })
  //     .catch(err => {
  //       res.status(500).json(err);
  //     });
  // });
  // this can moved into account for developers
  // requires auth
  // need add rules
  //   router.delete("/deleteplan/:id", (req, res) => {
  //     const id = req.params.id;
  //     data
  //       .deletePlan(id)
  //       .then(plan => {
  //         res.status(200).json(plan);
  //       })
  //       .catch(err => {
  //         res.status(500).json(err);
  //       });
  //   });
  return router;
};
