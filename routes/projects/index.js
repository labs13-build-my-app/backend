const Projects = require("./model");
const plans = require("../plans/planModel");
const db = require("../../data/dbConfig");

// /api/projects
// test endpoint not part of production
const testingProjectsRouter = (req, res) => {
    res.send("testing projects route");
  },
  // GET for all projects list
  // filter out completed and in progress
  // only send back projects in proposal status
  // remove filter on front end when implement these features
  // implement pagination
  listOfProjectsbyProposalStatus = async (req, res) => {
    const { page, per } = req.body;
    try {
      const projects = await Projects.listProjectsbyProposal(page, per);
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
  // Get project owner's All projects <<< Joe
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
  },
  getDeveloperFeedback = async (req, res) => {
    const { developer_id: user_id } = req.params;
    try {
      const plansWithFeedback = await plans.getDeveloperCompletedPlans(user_id);
      if (plansWithFeedback) {
        res.status(200).json(plansWithFeedback);
      } else {
        res.status(404).json({ message: "Plans with feedback do not exist." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Feedback request failed ${error.message}.` });
    }
  };

module.exports = router => {
  // router.get("/test-projects", testingProjectsRouter); // <<< test endpoint
  router.get("/", getAllProjects); // <<< list all projects in proposal status
  router.post("/paginated-list-of-projects", listOfProjectsbyProposalStatus);
  router.get("/plan-list-project/:project_id", projectPlanList); // <<< plan list for project
  router.get("/plan-list-developer/:developer_id", developerPlanList); // <<< plan list for developer
  router.get("/project/:id", getProject); // <<< project page view
  router.get("/plan-view/:plan_id", developersPlan); //  <<< plan page view
  router.get("/project-list/:project_owner_id", listProjectOwnersProjects); // <<< project list view of project owner id
  router.get("/developer-feedback/:developer_id", getDeveloperFeedback); // get feeback for completed projects
  return router;
};
