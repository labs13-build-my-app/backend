const Projects = require("./model");
const plans = require("../plans/planModel");
const db = require("../../data/dbConfig");

// /api/projects
// test endpoint not part of production
const testingProjectsRouter = (req, res) => {
    res.send("testing projects route");
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
  // Get project owner's All projects <<< Joe :)
  listProjectOwnersProjects = (req, res) => {
    const projectOwner_id = req.params.project_owner_id;
    Projects.findByProjectOwner(projectOwner_id)
      .then(projects => {
        projects.length === 0
          ? res.status(200).json({ message: "No Projects" })
          : res.status(200).json(projects);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  },
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
  },
  // plan list for developer id
  developerPlanList = (req, res) => {
    const { developer_id: user_id } = req.params;
    plans
      .getDeveloperPlans(user_id)
      .then(plans => {
        res.status(200).json(plans);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  },
  // plan list for project id
  projectPlanList = (req, res) => {
    const { project_id } = req.params;
    plans
      .getProjectPlans(project_id)
      .then(plans => {
        res.status(200).json(plans);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  };

module.exports = router => {
  // router.get("/test-projects", testingProjectsRouter); // <<< test endpoint
  router.get("/", getAllProjects); // <<< list all projects in proposal status
  router.get("/plan-list-project/:project_id", projectPlanList); // <<< plan list for project
  router.get("/plan-list-developer/:developer_id", developerPlanList); // <<< plan list for developer
  router.get("/project/:id", getProject); // <<< project page view
  router.get("/plan-view/:plan_id", developersPlan); //  <<< plan page view
  router.get("/project-list/:project_owner_id", listProjectOwnersProjects); // <<< project list view of project owner id
  // router.get("/user/project/:id", getUserProject);  // <<< no idea what this is for

  return router;
};
