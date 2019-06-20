const Projects = require("./model");
const plans = require("../plans/planModel");
const db = require("../../data/dbConfig");
const tokenVerification = require("../../customMiddleware/tokenVerification");
const retriveUserId = require("../../customMiddleware/retriveUserID");

const // /api/projects
  // list of projects in proposal status
  // results are paginated
  listOfProjectsbyProposalStatus = async (req, res) => {
    const {
      page,
      per,
      has_more,
      total_pages,
      update_pages,
      user_id
    } = req.query;
    let projects;
    try {
      if (has_more === false) {
        res
          .status(200)
          .json({ per, page, total_pages, has_more, projects: [] });
      } else {
        if (user_id) {
          projects = await Projects.listProjectsbyProposalAndUserID(
            page,
            per,
            total_pages,
            update_pages,
            user_id
          ); // <<
        } else {
          projects = await Projects.listProjectsbyProposal(
            page,
            per,
            total_pages,
            update_pages
          );
        }
        if (projects) {
          console.log(projects);
          res.status(200).json(projects);
        } else {
          res.status(404).json({
            message: "The projects could not be found in the database."
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        message: `Project request failed ${error.message}.`
      });
    }
  },
  // list of all projects
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
  // plan page by plan id
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
  // plan page by plan id
  selectedPlan = (req, res) => {
    const { project_id } = req.params;
    plans
      .getSelectedPlan(project_id)
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
        res.status(500).json(error.message);
      });
  },
  // project page by project id
  getProject = async (req, res) => {
    const { project_id: id } = req.params;
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
  // list of developer plans
  // deprecated no longer useing this method
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
  // list of plans of project
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
  // list of developer feed by of projects completed
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
  router.get("/", getAllProjects); // <<< list all projects in proposal status
  router.get("/paginated-list-of-projects", listOfProjectsbyProposalStatus); // <<< plan list for developers
  router.get("/plan-list-project/:project_id", projectPlanList); // <<< plan list for project
  router.get("/plan-list-developer/:developer_id", developerPlanList); // <<< plan list for developer, deprecated
  router.get("/project-view/:project_id", getProject); // <<< project page view
  router.get("/plan-view/:plan_id", developersPlan); //  <<< plan page view
  router.get("/selected-plan/:project_id", selectedPlan); //  <<< plan page view
  router.get("/project-list/:project_owner_id", listProjectOwnersProjects); // <<< project list view of project owner id
  router.get("/developer-feedback/:developer_id", getDeveloperFeedback); // get feeback for completed projects
  return router;
};
