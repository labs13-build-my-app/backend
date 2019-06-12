const Projects = require("./model");
const plans = require("../plans/planModel");

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
  // plan page view
  developersPlan = (req, res) => {
    const id = req.params.plan_id;
    plans
      .getPlanById(id)
      .then(plan => {
        if (plan === undefined) {
          throw new Error("no plan found by this id");
        }
        res.status(200).json(plan);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  // route needs to be update with getting id from auth
  /* listProjectOwnersProjects = (req, res) => {
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
  },*/
  // GET project by project ID
  // endpoint needs to be updated getting id from req.user_id
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
  };
// endpoint for developer dashboard
// listDevelopersPlans = (req, res) => {
//   res.send("endpoint to retrieve list of developer plans");
// };

module.exports = router => {
  router.get("/test-projects", testingProjectsRouter);
  router.get("/", getAllProjects);
  router.get("/project/:id", getProject);
  router.get("/plan-view/:plan_id", developersPlan);
  // router.get("/user/project/:id", getUserProject);
  // router.get("/project-owner", listProjectOwnersProjects);

  return router;
};
