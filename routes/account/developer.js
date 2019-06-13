const users = require("../users/userModel");
const plans = require("../plans/planModel");
const db = require("../../data/dbConfig");

// /api/account/developer

const testDeveloperRoute = (req, res) => {
    console.log("here in developer, looks like it works");
    res.send("I am a developer and I work, nice");
  },
  // this endpoint may no longer be valid
  developerDashboard = (req, res) => {
    const sub = req.sub;
    res.send("I am a developer and I work, nice");
    // users
    //   .findAuthorizedUser(sub)
    //   .then(user => {
    //     res.status(200).json({
    //       user,
    //       error: false,
    //       message: "The user was found in the database"
    //     });
    //   })
    //   .catch(err => {
    //     res.status(500).json({
    //       message: `User request failed ${error.message}.`
    //     });
    //   });
  },
  // update developer user profile
  updateDeveloper = async (req, res) => {
    const { id } = req.params;
    const userRole = req.userRole;
    if (userRole === "Developer") {
      const {
        firstName,
        lastName,
        image_url,
        email,
        skills,
        linkedIn,
        gitHub,
        twitter
      } = req.body;
      try {
        const user = await users.findUserById(id);
        if (user) {
          const userUpdate = { id };
          if (firstName) {
            userUpdate.firstName = firstName;
          }
          if (lastName) {
            userUpdate.lastName = lastName;
          }
          if (image_url) {
            userUpdate.image_url = image_url;
          }
          if (email) {
            userUpdate.email = email;
          }
          if (skills) {
            userUpdate.skills = skills;
          }
          if (linkedIn) {
            userUpdate.linkedIn = linkedIn;
          }
          if (gitHub) {
            userUpdate.gitHub = gitHub;
          }
          if (twitter) {
            userUpdate.twitter = twitter;
          }
          const editedUser = await users.updateUser(userUpdate, id);
          res.status(200).json(editedUser);
        } else {
          res.status(404).json({
            message: `The User with the specified ID does not exist.`
          });
        }
      } catch (error) {
        res.status(500).json({
          message: `User failed to update: ${error.message}.`
        });
      }
    } else {
      res.status(403).json({ message: "You should be a Developer to do this" });
    }
  },
  // delete developer account with sub
  deleteDeveloper = (req, res) => {
    const { sub } = req;
    users
      .findAuthorizedUser(sub)
      .del()
      .then(del => {
        res.status(200).json(del);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  // this endpoint no longer needed I think
  // endpoint for developer dashboard
  listDevelopersPlans = (req, res) => {
    const userID = req.userID;
    console.log(userID, "this should console log before hitting the db");
    plans
      .getPlans()
      .where({ user_id: userID })
      .then(plans => {
        res.status(200).json(plans);
      })
      .catch(err => {
        console.log("is this error coming from here???", err);
        res.status(500).json(err);
      });
  },
  // page view to submit a plan
  // saves plan if plan doesn't exist already by developer
  createPlan = (req, res) => {
    const sub = req.sub;
    const id = req.userID;
    const { project_id } = req.params;
    const planStatus = "proposal";
    const { name, description, technologiesToUse, dueDate, budget } = req.body;
    const plan = {};
    console.log(project_id, id, sub);

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
      .then(existPlan => {
        if (existPlan === undefined) {
          plan.name = name;
          plan.description = description;
          plan.technologiesToUse = technologiesToUse;
          plan.budget = budget;
          plan.dueDate = dueDate;
          plan.planStatus = planStatus;
          plan.project_id = Number(project_id);

          console.log(plan);
          return plans.addPlan(plan);
        } else {
          throw new Error("plan already exist for developer");
        }
      })
      .then(id => {
        id = id[0];
        res.status(201).json({ id, ...plan });
      })
      .catch(error => {
        console.log("checking this error", error);
        res.status(500).json({
          message: `plan already exist for developer ${error.message}.`
        });
      });
  },
  // update a plan if only in status of proposal
  // current bug updates plan regardless of status
  updatePlan = async (req, res) => {
    const userID = req.userID;
    console.log("in update plan");
    const { id } = req.params;
    const { name, description, budget, dueDate, planStatus } = req.body;
    try {
      const Plan = await db("plans")
        .where({ id })
        .andWhere({ user_id: userID })
        .first();
      if (Plan) {
        const PlanUpdate = { user_id: userID };
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
        const editedPlan = await plans.updatePlan(id, PlanUpdate);
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
    const { plan_id: id } = req.params;
    plans
      .deletePlan(id)
      .then(plan => {
        res.status(200).json(plan);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  // prioritize last
  messageProjectOwner = (req, res) => {
    res.send("endpoint to message a project owner or maybe admin");
  };

module.exports = router => {
  router.get("/test-developer", testDeveloperRoute);
  // router.get("/dashboard-developer", developerDashboard);  // <<< may no longer need
  router.put("/update-profile-developer/:id", updateDeveloper); // <<< update developer by id on params
  router.delete("/delete-profile-developer", deleteDeveloper); // <<< delete developer
  // router.get("/plan-list", listDevelopersPlans); // <<< may no longer need
  router.post("/submit-plan-developer/:project_id", createPlan); // provide project id as id
  router.put("/update-plan/:id", updatePlan); // provide plan id as id
  router.delete("/delete-plan/:plan_id", deletePlan); // <<< delete by plan id
  router.post("/message-developer", messageProjectOwner);

  return router;
};
