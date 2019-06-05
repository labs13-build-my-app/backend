const db = require("../../data/dbConfig.js");

const getAll = () => db("projects");

const findByProjectOwner = id => db("projects").where({ user_id: id });

async function addProject(newProject) {
  const [id] = await db("projects").insert(newProject, "id");
  if (id) {
    const project = await findById(id, newProject.user_id);
    return project;
  }
}

async function findById(id, userID) {
  const project = await db("projects")
    .where({ "projects.id": id })
    .andWhere({ "projects.user_id": userID })
    .first();
  return project;
}

module.exports = {
  getAll,
  findByProjectOwner,
  addProject,
  findById
};
