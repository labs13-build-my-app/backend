const users = require("../users/userModel");
const plans = require("../plans/planModel");
const db = require("../../data/dbConfig");

const // /api/account/developer
  // update developer user profile
  // repeative code can be refactored
  updateDeveloper = async (req, res) => {
    const id = req.userID;
    const userRole = req.userRole;
    if (userRole === "Developer") {
      const {
        firstName,
        lastName,
        profile_picture_url,
        email,
        devType,
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
          if (profile_picture_url) {
            userUpdate.profile_picture_url = profile_picture_url;
          }
          if (email) {
            userUpdate.email = email;
          }
          if (skills) {
            userUpdate.skills = skills;
          }
          if (devType) {
            userUpdate.devType = devType;
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
  // repeative code can be refactored
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
  // list developer plans
  // endpoint for developer dashboard
  // this endpoint no longer needed I think
  // not in use
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
    const planStatus = "submitted";
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
  updatePlan = async (req, res) => {
    const userID = req.userID;
    const { plan_id: id } = req.params;
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
          PlanUpdate.planStatus = planStatus;
        }
        const editedPlan = await plans.updatePlan(id, PlanUpdate);
        res.status(200).json(editedPlan);
      } else {
        res.status(404).json({
          message: `The Plan with the specified ID does not exist.`
        });
      }
    } catch (error) {
      res.status(500).json({
        message: `Plan updated failed ${error.message}.`
      });
    }
  },
  // delete a plan if only status of proposal
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
  // not in use
  messageProjectOwner = (req, res) => {
    res.send("endpoint to message a project owner or maybe admin");
  };

// /api/account/developer
module.exports = router => {
  router.put("/update-profile-developer", updateDeveloper); // <<< update developer by id on params
  router.delete("/delete-profile-developer", deleteDeveloper); // <<< delete developer
  router.post("/submit-plan/:project_id", createPlan); // provide project id as id
  router.put("/update-plan/:plan_id", updatePlan); // provide plan id as id
  router.delete("/delete-plan/:plan_id", deletePlan); // <<< delete by plan id
  // router.post("/message-developer", messageProjectOwner);

  return router;
};
