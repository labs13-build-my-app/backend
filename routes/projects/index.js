const express = require("express");
const router = express.Router();

const Projects = require("./model");

// /api/projects

const testingProjectsRouter = (req, res) => {
    console.log("here in projects, looks like it works");
    res.send("testing projects route, looks like it works");
  },
  getAllProjects = async (req, res) => {
    try {
      const projects = await data.getAllProjects();
      if (projects) {
        res.status(200).json(projects);
      } else {
        res.status(404).json({
          message: "The projects could not be found in the database."
        });
      }
    } catch (error) {
      res.status(500).josn({
        message: `Project request failed ${error.message}.`
      });
    }
  },
  listDevelopersPlans = (req, res) => {
    res.send("endpoint to retrieve list of developer plans");
  },
  developersPlan = (req, res) => {
    res.send(
      "endpoint to retrieve developers plan to a project owners project"
    );
  },
  listProjectOwnersProjects = (req, res) => {
    const projectOwner_id = req.user_id;

    //Projects.findByProjectOwner(projectOwner_id)
    //Delete this line and line below and uncomment line above when login is finished
    Projects.findByProjectOwner(51)
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  },
  projectOwnersProject = async (req, res) => {
    const userID = 96; // Need to be chaned; take userID from decoded token
    const { id } = req.params;
    try {
      const project = await Projects.findById(id, userID);
      if (project) {
        res.status(200).json(project);
      } else {
        res
          .status(404)
          .json({ message: "Project with specified ID does not exist." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Project request failed ${error.message}.` });
    }
  };

module.exports = router => {
  router.get("/test-projects", testingProjectsRouter);
  router.get("/list-all-projects", getAllProjects);
  router.get("/plan-list", listDevelopersPlans);
  // router.get("/project-owner", listProjectOwnersProposals);
  router.get("/submitted-plan/:id", developersPlan);
  router.get("/project/:id", projectOwnersProject);

  return router;
};
