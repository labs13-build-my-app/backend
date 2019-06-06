const express = require('express');
const router = express.Router();

const Projects = require('./model');

const testingProjectsRouter = (req, res) => {
    console.log("here in projects, looks like it works");
    res.send("testing projects route, looks like it works");
  },
  listDevelopersPlans = (req, res) => {
    res.send("endpoint to retrieve list of developer plans");
  },
  developersPlan = (req, res) => {
    res.send(
      "endpoint to retrieve developers plan to a project owners proopsal"
    );
  },
  listProjectOwnersProposals = (req, res) => {
    const projectOwner_id = req.user_id;

    //Projects.findByProjectOwner(projectOwner_id)
    //Delete this line and line below and uncomment line above when login is finished
    Projects.findByProjectOwner(51)
      .then(projects => {
        res
          .status(200)
          .json(projects);
      })
      .catch(error => {
        res
          .status(500)
          .json(error);
      });
  },
  projectOwnersProposal = (req, res) => {
    res.send("endpoint to retrieve project owner's proposal");
  };

module.exports = router => {
  router.get("/test-projects", testingProjectsRouter);
  router.get("/plan-list", listDevelopersPlans);
  router.get("/submitted-plan/:plan-id", developersPlan);
  router.get("/project-owner", listProjectOwnersProposals);
  router.get("/proposal/:proposal-id", projectOwnersProposal);

  return router;
};
