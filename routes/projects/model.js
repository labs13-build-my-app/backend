const db = require("../../data/dbConfig.js");

module.exports = {
  getAllProjects,
  listProjectsbyProposal,
  findByProjectOwner,
  addProject,
  findById,
  findUserProjectById,
  updateProject,
  listProjectsbyProposalAndUserID,
  deleteProject
};

// list all projects created
async function getAllProjects() {
  return db("projects")
    .innerJoin("users", "users.id", "projects.user_id")
    .select(
      "projects.id",
      "projects.name",
      "projects.description",
      "projects.image_url",
      "projects.budget",
      "projects.dueDate",
      "projects.projectStatus",
      "projects.paymentStatus",
      "projects.feedback",
      "projects.user_id",
      "users.email",
      "users.firstName",
      "users.lastName",
      "users.profile_picture_url"
    );
}

// list all projects by status of proposal
// returns paginated result
async function listProjectsbyProposal(
  page = 1,
  per = 15,
  total_pages,
  update_pages
) {
  try {
    if (per !== 0) {
      const projects = await db("projects")
        .where({ projectStatus: "proposal" })
        .innerJoin("users", "users.id", "projects.user_id")
        .select(
          "projects.id",
          "projects.name",
          "projects.description",
          "projects.image_url",
          "projects.budget",
          "projects.dueDate",
          "projects.projectStatus",
          "projects.paymentStatus",
          "projects.feedback",
          "projects.user_id",
          "users.email",
          "users.firstName",
          "users.lastName",
          "users.profile_picture_url"
        )
        .orderBy("projects.id", "desc")
        .limit(per)
        .offset((page - 1) * per);

      if (total_pages || update_pages === false) {
        const has_more = page < total_pages ? true : false;
        return { per, page, total_pages, has_more, projects };
      }
      const projectsList = await db("projects").where({
        projectStatus: "proposal"
      });
      // .innerJoin("users", "users.id", "projects.user_id")
      // .select(
      //   "projects.id",
      //   "projects.name",
      //   "projects.description",
      //   "projects.image_url",
      //   "projects.budget",
      //   "projects.dueDate",
      //   "projects.projectStatus",
      //   "projects.paymentStatus",
      //   "projects.feedback",
      //   "projects.user_id",
      //   "users.email",
      //   "users.firstName",
      //   "users.lastName"
      // );
      const total = projectsList.length;
      total_pages = Math.ceil(total / per);
      const has_more = page < total_pages ? true : false;
      return { per, page, total_pages, has_more, projects };
    } else {
      const projects = await db("projects")
        .where({
          projectStatus: "proposal"
        })
        .innerJoin("users", "users.id", "projects.user_id")
        .select(
          "projects.id",
          "projects.name",
          "projects.description",
          "projects.image_url",
          "projects.budget",
          "projects.dueDate",
          "projects.projectStatus",
          "projects.paymentStatus",
          "projects.feedback",
          "projects.user_id",
          "users.email",
          "users.firstName",
          "users.lastName",
          "users.profile_picture_url"
        );
      return { per: null, page: 1, total_pages: 1, has_more: false, projects };
    }
  } catch (error) {
    throw error;
  }
}

async function listProjectsbyProposalAndUserID(
  page = 1,
  per = 15,
  total_pages,
  update_pages,
  userid
) {
  try {
    if (per !== 0) {
      const projects = await db("projects")
        .leftJoin("plans", "plans.project_id", "projects.id")
        .innerJoin("users", "users.id", "projects.user_id")
        .where({ projectStatus: "proposal" })
        .andWhere(function() {
          this.whereNull("plans.user_id").orWhere(
            "plans.user_id",
            "!=",
            userid
          );
        })
        .select({
          projectID: "projects.id",
          projectName: "projects.name",
          projectDecription: "projects.description",
          projectImageUrl: "projects.image_url",
          projectBudget: "projects.budget",
          projectDueDate: "projects.dueDate",
          projectProjectStatus: "projects.projectStatus",
          projectPaymentStatus: "projects.paymentStatus",
          projectFeedback: "projects.feedback",
          projectProjectOwnerID: "projects.user_id",
          plansDeveloperId: "plans.user_id",
          plansName: "plans.name",
          plansId: "plans.id",
          userEmail: "users.email",
          userFirstName: "users.firstName",
          userLastName: "users.lastName",
          projectOwnerAvatar: "users.profile_picture_url"
        })
        .orderBy("projects.id", "desc")
        .limit(per)
        .offset((page - 1) * per);

      if (total_pages || update_pages === false) {
        const has_more = page < total_pages ? true : false;
        return { per, page, total_pages, has_more, projects };
      }
      const projectsList = await db("projects").where({
        projectStatus: "proposal"
      });
      const total = projectsList.length;
      total_pages = Math.ceil(total / per);
      const has_more = page < total_pages ? true : false;
      return { per, page, total_pages, has_more, projects };
    } else {
      const projects = await db("projects")
        .leftJoin("plans", "plans.project_id", "projects.id")
        .innerJoin("users", "users.id", "projects.user_id")
        .where({
          projectStatus: "proposal"
        })
        .andWhere(function() {
          this.whereNull("plans.user_id").orWhere(
            "plans.user_id",
            "!=",
            userid
          );
        })
        .select({
          projectID: "projects.id",
          projectName: "projects.name",
          projectDecription: "projects.description",
          projectImageUrl: "projects.image_url",
          projectBudget: "projects.budget",
          projectDueDate: "projects.dueDate",
          projectProjectStatus: "projects.projectStatus",
          projectPaymentStatus: "projects.paymentStatus",
          projectFeedback: "projects.feedback",
          projectProjectOwnerID: "projects.user_id",
          plansDeveloperId: "plans.user_id",
          plansName: "plans.name",
          plansId: "plans.id",
          userEmail: "users.email",
          userFirstName: "users.firstName",
          userLastName: "users.lastName",
          projectOwnerAvatar: "users.profile_picture_url"
        });

      return { per: null, page: 1, total_pages: 1, has_more: false, projects };
    }
  } catch (error) {
    throw error;
  }
}

// find list of projects by project owner id
async function findByProjectOwner(user_id) {
  const projects = await db("projects").where({ user_id });

  const promises = projects.map(
    async project =>
      await db("plans")
        .where({ project_id: project.id })
        .then(plans => {
          project.plans = plans;
          return project;
        })
  );

  return Promise.all(promises).then(results => results);
}

// add new project by project owner
async function addProject(newProject) {
  const [id] = await db("projects").insert(newProject, "id");
  if (id) {
    const project = await findById(id, newProject.user_id);
    return project;
  }
}

// find project by project id
async function findById(id) {
  const project = await db("projects")
    .where({ "projects.id": id })
    .innerJoin("users", "users.id", "projects.user_id")
    .select(
      "projects.id",
      "projects.name",
      "projects.description",
      "projects.image_url",
      "projects.budget",
      "projects.dueDate",
      "projects.projectStatus",
      "projects.paymentStatus",
      "projects.feedback",
      "projects.user_id",
      "users.email",
      "users.firstName",
      "users.lastName",
      { projectOwnerAvatar: "users.profile_picture_url" }
    )
    .first();
  return project;
}

// find project of project owner by project id and project owner id
async function findUserProjectById(id, userID) {
  const project = await db("projects")
    .where({ "projects.id": id })
    .andWhere({ "projects.user_id": userID })
    .first();
  return project;
}

// update project by project id
async function updateProject(project, id) {
  const editedProject = await db("projects")
    .where({ id })
    .update(project);
  if (editedProject) {
    const updatedProject = await findUserProjectById(id, project.user_id);
    return updatedProject;
  }
}

// delete developer plan
// protected route
async function deletePlan(id) {
  return db("projects")
    .where({ id })
    .andWhere({ projectStatus: "proposal" })
    .del(id);
}

function deleteProject(id) {
  return db("projects")
    .where({ id })
    .first()
    .del(id)
}
