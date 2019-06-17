const db = require("../../data/dbConfig.js");

module.exports = {
  getAllProjects,
  listProjectsbyProposal,
  findByProjectOwner,
  addProject,
  findById,
  findUserProjectById,
  updateProject
};

// list all projects created
async function getAllProjects() {
  return db("projects");
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
        .orderBy("id", "desc")
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
      const projects = await db("projects").where({
        projectStatus: "proposal"
      });
      return { per: null, page: 1, total_pages: 1, has_more: false, projects };
    }
  } catch (error) {
    throw error;
  }
}

// find list of projects by project owner id
async function findByProjectOwner(id) {
  return db("projects").where({ user_id: id });
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
