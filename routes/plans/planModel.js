const db = require("../../data/dbConfig");

const addPlan = plan => {
  return db("plans").insert(plan);
};

const getPlans = () => {
  return db("plans");
};

const getPlanById = id => {
  return db("plans")
    .where({ id })
    .first();
};

const updatePlan = (id, changes) => {
  return db("plans")
    .where({ id })
    .update(changes);
};

module.exports = {
  getPlans,
  getPlanById,
  addPlan,
  updatePlan
  //   deletePlan
};
