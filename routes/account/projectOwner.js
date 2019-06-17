const Users = require("../users/userModel");
const Projects = require("../projects/model");
const Plans = require("../plans/planModel");
const db = require("../../data/dbConfig");

const // /api/account/project-owner
  // update project owner user profile
  // repeative code can be refactored
  updateProjectOwner = async (req, res) => {
    const { id } = req.params;
    const userRole = req.userRole;
    if (userRole === "Project Owner") {
      const {
        firstName,
        lastName,
        image_url,
        email,
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
      res
        .status(403)
        .json({ message: "You should be a ProjectOwner to do this" });
    }
  },
  // delete project account with sub
  // repeative code can be refactored
  deleteProjectOwner = (req, res) => {
    const { sub } = req;
    Users.findAuthorizedUser(sub)
      .del()
      .then(del => {
        res.status(200).json(del);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  // GET project owner's project (Single) by ID page view <<< Marina
  // might not need this route, up for review
  getProjectOwnersProject = async (req, res) => {
    const userID = req.userID;
    const { project_id: id } = req.params;
    try {
      const project = await Projects.findUserProjectById(id, userID);
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
  // page view to create a project as Project Owner
  createProject = async (req, res) => {
    const userID = req.userID;
    const userRole = req.userRole;
    if (userRole === "Project Owner") {
      const { name, description, image_url, budget, dueDate } = req.body;
      if (!name || !description || !budget || !dueDate) {
        res.status(401).json({
          message:
            "Please do not leave name, description, budget, dueDate, project status or payment status of the project fields blank."
        });
      } else {
        try {
          let newProjectInfo = {
            name,
            description,
            budget,
            dueDate: new Date(dueDate),
            projectStatus: "proposal",
            paymentStatus: "unpaid",
            image_url,
            user_id: userID
          };
          let newProject = await Projects.addProject(newProjectInfo);
          res.status(201).json(newProject);
        } catch (error) {
          res.status(500).json({
            message: `Your project could not be posted ${error.message}.`
          });
        }
      }
    } else {
      res
        .status(403)
        .json({ message: "You should be a Project Owner to do this" });
    }
  },
  // update project
  updateProject = async (req, res) => {
    const userID = req.userID;
    const { project_id: id } = req.params;
    const userRole = req.userRole;
    if (userRole === "Project Owner") {
      const {
        name,
        description,
        image_url,
        budget,
        dueDate,
        projectStatus,
        paymentStatus,
        feedback
      } = req.body;
      try {
        const project = await Projects.findUserProjectById(id, userID);
        if (project) {
          const projectUpdate = { user_id: userID };
          if (name) {
            projectUpdate.name = name;
          }
          if (description) {
            projectUpdate.description = description;
          }
          if (image_url) {
            projectUpdate.image_url = organization;
          }
          if (budget) {
            projectUpdate.budget = budget;
          }
          if (dueDate) {
            projectUpdate.dueDate = dueDate;
          }
          if (projectStatus) {
            projectUpdate.projectStatus = projectStatus;
          }
          if (paymentStatus) {
            projectUpdate.paymentStatus = paymentStatus;
          }
          if (feedback) {
            projectUpdate.feedback = feedback;
          }
          const editedProject = await Projects.updateProject(projectUpdate, id);
          res.status(200).json(editedProject);
        } else {
          res.status(404).json({
            message: `The project with the specified ID does not exist.`
          });
        }
      } catch (error) {
        res.status(500).json({
          message: `Project updated failed ${error.message}.`
        });
      }
    } else {
      res
        .status(403)
        .json({ message: "You should be a Project Owner to do this" });
    }
  },
  // accpet a plan
  acceptPlan = async (req, res) => {
    const userID = req.userID;
    const { project_id } = req.params;
    const { planStatus, id } = req.body;
    try {
      const Plan = await db("plans")
        .where({ id })
        .andWhere({ project_id: project_id })
        .first();
      if (Plan) {
        const PlanUpdate = { user_id: Plan.user_id };
        if (planStatus) {
          PlanUpdate.planStatus = planStatus;
        }
        const editedPlan = await Plans.updatePlan(id, PlanUpdate);
        res.status(200).json(editedPlan);
      } else {
        res.status(404).json({
          message: `The plan with the specified ID does not exist.`
        });
      }
    } catch (error) {
      res.status(500).json({
        message: `Plan updated failed ${error.message}.`
      });
    }
  },
  // delete a project if only status of proposal
  deleteProject = (req, res) => {
    const { project_id: id } = req.params;
    Projects.deleteProject(id)
      .then(plan => {
        res.status(200).json(plan);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  // not in use
  submitPayment = (req, res) => {
    res.send("endpoint for project owner to submit paymet to project");
  },
  // not in use
  messageDeveloper = (req, res) => {
    res.send("endpoint to message a project owner or maybe admin");
  };

// /api/account/project-owner
module.exports = router => {
  router.put("/update-profile-project-owner", updateProjectOwner);
  router.delete("/delete-profile-project-owner", deleteProjectOwner);
  router.get("/project-page/:project_id", getProjectOwnersProject); // << might need this route
  router.post("/create-project-project-owner", createProject);
  router.put("/update-project-project-owner/:project_id", updateProject);
  router.put("/accept-plan/:project_id", acceptPlan);
  router.delete("/delete-project-project-owner/project_id", deleteProject);
  // router.post("/submit-payment/:project_id", submitPayment);
  // router.post("/message-project-owner", messageDeveloper);

  return router;
};
