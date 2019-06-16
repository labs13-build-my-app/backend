const db = require("../../data/dbConfig.js");

const getAllProjects = () => db("projects");

const listProjectsbyProposal = (page = 1) => {
  const size = 15;
  return db("projects")
    .where({ projectStatus: "proposal" })
    .limit(size)
    .offset(page * size);
};

const findByProjectOwner = id => db("projects").where({ user_id: id });

async function addProject(newProject) {
  const [id] = await db("projects").insert(newProject, "id");
  if (id) {
    const project = await findById(id, newProject.user_id);
    return project;
  }
}

async function findById(id) {
  const project = await db("projects")
    .where({ "projects.id": id })
    .first();
  return project;
}

async function findUserProjectById(id, userID) {
  const project = await db("projects")
    .where({ "projects.id": id })
    .andWhere({ "projects.user_id": userID })
    .first();
  return project;
}

async function updateProject(project, id) {
  const editedProject = await db("projects")
    .where({ id })
    .update(project);
  if (editedProject) {
    const updatedProject = await findUserProjectById(id, project.user_id);
    return updatedProject;
  }
}

module.exports = {
  getAllProjects,
  findByProjectOwner,
  addProject,
  findById,
  findUserProjectById,
  updateProject,
  listProjectsbyProposal
};
