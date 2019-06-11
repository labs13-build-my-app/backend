const users = require("../users/userModel");
const projects = require("../plans/planModel");
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
  // page view to submit a plan
  // bug, should only be able to create a plan to a project once
  // but alows you to created unlimted plans to a project
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
        console.log(user);
        return db("plan")
          .where({ "projects.id": project_id })
          .andWhere({ "users.user_id": user_id })
          .first();
      })
      .then(user => {
        console.log(user, "here");
        if (user === undefined) {
          plan.name = name;
          plan.description = description;
          plan.technologiesToUse = technologiesToUse;
          plan.budget = budget;
          plan.dueDate = dueDate;
          plan.planStatus = planStatus;
          plan.project_id = Number(project_id);
          return projects.addPlan(plan);
        }
      })
      .then(id => {
        // returns only id, can change to return full plan created
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
  router.post("/submit-plan-developer/:project_id", createPlan);
  router.put("/update-plan-developer", updatePlan);
  router.delete("/delete-plan-developer", deletePlan);
  router.post("/message-developer", messageProjectOwner);

  return router;
};
