const db = require('../../data/dbConfig.js');

const getAll = () => (
  db('projects')
);

const findByProjectOwner = id => (
  db('projects')
    .where({user_id: id})
)

const addProject = async project => {
  const project_id = await db('projects')
    .insert(project, 'id')
  
  return db('projects')
    .where({id: project_id})
}

module.exports = {
  getAll,
  findByProjectOwner,
  addProject
}
