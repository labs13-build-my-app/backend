const data = require("../users/userModel");
const Projects = require("../projects/model");

// /api/projects

const testProjectOwnerRoute = (req, res) => {
    console.log("here in project owner, looks like it works");
    res.send("I am a project owner, nice");
  },
  projectOwnerDashboard = (req, res) => {
    const id = req.params.id;
    data
      .findAuthorizedUser()
      .then(user => {
        res.status(200).json({
          user,
          error: false,
          message: "The user were found in the database"
        });
      })
      .catch(err => {
        res.status(500).json({
          message: `User request failed ${error.message}.`
        });
      });
  },
  updateProjectOwner = (req, res) => {
    res.send("endpoint to update project owner account");
  },
  deleteProjectOwner = (req, res) => {
    res.send("endpoint to delete project owner account");
  },
  createProject = async (req, res) => {
    const userID = 34; // Need to be chaned; take userID from decoded token >>> req.user_id = sub;
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
  };

(updateProject = (req, res) => {
  res.send("endpoint to update project owner project");
}),
  (deleteProject = (req, res) => {
    res.send("endpoint to delete project owners project");
  }),
  (submitPayment = (req, res) => {
    res.send("endpoint for project owner to submit paymet to project");
  }),
  (messageDeveloper = (req, res) => {
    res.send("endpoint to message a project owner or maybe admin");
  });

module.exports = router => {
  router.get("/test-project-owner", testProjectOwnerRoute);
  router.get("/dashboard-project-owner", projectOwnerDashboard);
  router.put("/update-profile-project-owner", updateProjectOwner);
  router.delete("/delete-profile-project-owner", deleteProjectOwner);
  router.post("/create-project-project-owner", createProject);
  router.put("/update-project-project-owner", updateProject);
  router.delete("/delete-project-project-owner", deleteProject);
  router.post("/submit-payment/:id", submitPayment);
  router.post("/message-project-owner", messageDeveloper);

  return router;
};
