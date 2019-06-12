const Users = require("../users/userModel");
const Projects = require("../projects/model");
// /api/projects

// 1
const testProjectOwnerRoute = (req, res) => {
    console.log("here in project owner, looks like it works");
    res.send("I am a project owner, nice");
  },
  projectOwnerDashboard = (req, res) => {
    const id = req.user_id;
    // currently is sending basic user information
    // incomplete need to be sending user specific information to dashboard
    Users.findAuthorizedUser(id)
      .then(user => {
        res.status(200).json({
          user,
          error: false,
          message: "The user were found in the database"
        });
      })
      .catch(error => {
        res.status(500).json({
          message: `User request failed ${error.message}.`
        });
      });
  },
  // prioritize last
  updateProjectOwner = (req, res) => {
    res.send("endpoint to update project owner account");
  },
  // prioritize last

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
  // Get project owner's All projects <<< Joe :)
  listProjectOwnersProjects = (req, res) => {
    const projectOwner_id = req.userID;
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
  // GET project owner's project (Single) by ID page view <<< Marina
  getProjectOwnersProject = async (req, res) => {
    const userID = req.userID;
    const { id } = req.params;
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
  // page view to create a project
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
            dueDate,
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
  updateProject = async (req, res) => {
    const userID = req.userID;
    const { id } = req.params;
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
  // prioritize last
  deleteProject = (req, res) => {
    res.send("endpoint to delete project owners project");
  },
  // prioritize last
  submitPayment = (req, res) => {
    res.send("endpoint for project owner to submit paymet to project");
  },
  // prioritize last
  messageDeveloper = (req, res) => {
    res.send("endpoint to message a project owner or maybe admin");
  };

// /api/account/project-owner
module.exports = router => {
  router.get("/test-project-owner", testProjectOwnerRoute);
  router.get("/dashboard-project-owner", projectOwnerDashboard);
  router.get("/user/project/:id", getProjectOwnersProject);
  router.get("/project-list", listProjectOwnersProjects);
  router.put("/update-profile-project-owner", updateProjectOwner);
  router.delete("/delete-profile-project-owner", deleteProjectOwner);
  router.post("/create-project-project-owner", createProject);
  router.put("/update-project-project-owner/:id", updateProject); /// <<< MB
  router.delete("/delete-project-project-owner", deleteProject);
  router.post("/submit-payment/:id", submitPayment);
  router.post("/message-project-owner", messageDeveloper);

  return router;
};
