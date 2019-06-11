const users = require("../users/userModel");
const projects = require("../plans/planModel");
const plans = require("../plans/planModel");
const db = require("../../data/dbConfig");
// 1

const testDeveloperRoute = (req, res) => {
    console.log("here in developer, looks like it works");
    res.send("I am a developer and I work, nice");
  },
  developerDashboard = (req, res) => {
    const sub = req.sub;
    data
      .findAuthorizedUser(sub)
      .then(user => {
        res.status(200).json({
          user,
          error: false,
          message: "The user was found in the database"
        });
      })
      .catch(err => {
        res.status(500).json({
          message: `User request failed ${error.message}.`
        });
      });
  },
  // prioritize last
  updateDeveloper = (req, res) => {
    res.send("endpoint to update developers account");
  },
  // prioritize last
  deleteDeveloper = (req, res) => {
    res.send("endpoint to delete developer account");
  },
  // endpoint for developer dashboard
  listDevelopersPlans = (req, res) => {
    const userID = 51; //req.userID;
    plans
      .getPlans()
      .where({ user_id: userID })
      .then(plans => {
        res.status(200).json(plans);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // page view to submit a plan
  // saves plan if plan doesn't exist already by developer
  createPlan = (req, res) => {
    const sub = req.sub;
    const { project_id } = req.params;
    const planStatus = "proposal";
    const { name, description, technologiesToUse, dueDate, budget } = req.body;
    const plan = {};

    users
      .findAuthorizedUser(sub)
      .then(user => {
        const { id: user_id } = user;
        plan.user_id = user_id;
        return db("plans")
          .where({ project_id: Number(project_id) })
          .andWhere({ user_id: user_id })
          .first();
      })
      .then(plans => {
        if (plans === undefined) {
          plan.name = name;
          plan.description = description;
          plan.technologiesToUse = technologiesToUse;
          plan.budget = budget;
          plan.dueDate = dueDate;
          plan.planStatus = planStatus;
          plan.project_id = Number(project_id);
          return projects.addPlan(plan);
        } else {
          throw new Error("plan already exist for developer");
        }
      })
      .then(id => {
        id = id[0];
        res.status(201).json({ id, ...plan });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  // update a plan if only in status of proposal
  // current bug updates plan regardless of status
  updatePlan = async (req, res) => {
    // const userID = req.userID;
    console.log("in update plan");
    const { plan_id } = req.params;
    const { name, description, budget, dueDate, planStatus } = req.body;
    try {
      const Plan = await db("plans")
        .where({ id: plan_id })
        .andWhere({ user_id: 51 })
        .first();
      if (Plan) {
        const PlanUpdate = { user_id: 51 };
        if (name) {
          PlanUpdate.name = name;
        }
        if (description) {
          PlanUpdate.description = description;
        }
        if (budget) {
          PlanUpdate.budget = budget;
        }
        if (dueDate) {
          PlanUpdate.dueDate = dueDate;
        }
        if (planStatus) {
          PlanUpdate.PlanStatus = PlanStatus;
        }
        const editedPlan = await plans.updatePlan({ id: plan_id }, PlanUpdate);
        console.log(editedPlan, PlanUpdate, Plan);
        res.status(200).json(editedPlan);
      } else {
        res.status(404).json({
          message: `The project with the specified ID does not exist.`
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: `Project updated failed ${error.message}.`
      });
    }
  },
  // delete a plan if only status of proposal
  // current bug deletes plan regardless of status
  deletePlan = (req, res) => {
    res.send("endpoint to delete developers plan");
  },
  // prioritize last
  messageProjectOwner = (req, res) => {
    res.send("endpoint to message a project owner or maybe admin");
  };

module.exports = router => {
  router.get("/test-developer", testDeveloperRoute);
  router.get("/dashboard-developer", developerDashboard);
  router.put("/update-profile-developer", updateDeveloper);
  router.delete("/delete-profile-developer", deleteDeveloper);
  router.get("/plan-list", listDevelopersPlans);
  router.post("/submit-plan-developer/:project_id", createPlan);
  router.put("/update-plan/:plan_id", updatePlan);
  router.delete("/delete-plan-developer", deletePlan);
  router.post("/message-developer", messageProjectOwner);

  return router;
};
