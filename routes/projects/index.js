const Projects = require("./model");

// /api/projects
// 4

const testingProjectsRouter = (req, res) => {
    console.log("here in projects, looks like it works");
    res.send("testing projects route, looks like it works");
  },
  // GET for all projects list
  // implement pagination
  getAllProjects = async (req, res) => {
    try {
      const projects = await Projects.getAllProjects();
      if (projects) {
        res.status(200).json(projects);
      } else {
        res.status(404).json({
          message: "The projects could not be found in the database."
        });
      }
    } catch (error) {
      res.status(500).json({
        message: `Project request failed ${error.message}.`
      });
    }
  },
  // GET project by project ID page
  getProject = async (req, res) => {
    const { id } = req.params;
    try {
      const project = await Projects.findById(id);
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
  },
  // endpoint for developer dashboard
  listDevelopersPlans = (req, res) => {
    res.send("endpoint to retrieve list of developer plans");
  },
  // plan page view
  developersPlan = (req, res) => {
    res.send(
      "endpoint to retrieve developers plan to a project owners project"
    );
  };

module.exports = router => {
  router.get("/test-projects", testingProjectsRouter);
  router.get("/", getAllProjects);
  router.get("/project/:id", getProject);
  router.get("/plan-list", listDevelopersPlans);
  router.get("/submitted-plan/:id", developersPlan);
  return router;
};
