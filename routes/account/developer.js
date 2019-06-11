const users = require("../users/userModel");
const projects = require("../plans/planModel");
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
    const userID = req.userID;
    plans
      .getPlans()
      .where({ user_id: userID })
      .then(plans => {
        res.status(200).json(plans);
      })
      .catch(err => {
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
  // prioritize last
  updatePlan = (req, res) => {
    res.send("endpoint to update developers plan to submitted project");
  },
  // prioritize last
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
  router.put("/update-plan-developer", updatePlan);
  router.delete("/delete-plan-developer", deletePlan);
  router.post("/message-developer", messageProjectOwner);

  return router;
};
