const db = require("../../data/dbConfig");

const addPlan = plan => {
  return db("plans").insert(plan);
};

const getPlans = () => {
  return db("plans");
};

module.exports = {
  getPlans,
  //   getPlanbyID,
  addPlan
  //   updatePlan,
  //   deletePlan
};
