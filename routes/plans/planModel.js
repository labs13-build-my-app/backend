const db = require("../../data/dbConfig");

const addPlan = plan => {
  return db("plans").insert(plan, "id");
};

const getPlans = () => {
  return db("plans");
};

const getPlanById = id => {
  return db("plans")
    .where({ id })
    .first();
};

async function updatePlan(id, changes) {
  const editedPlan = await db("plans")
    .where({ id })
    .update(changes);
  if (editedPlan) {
    const updatedPlan = await getPlanById(id);
    return updatedPlan;
  }
}

const deletePlan = id => {
  return db("plans")
    .where({ id })
    .del(id);
};

module.exports = {
  getPlans,
  getPlanById,
  addPlan,
  updatePlan,
  deletePlan
};
