const db = require("../../data/dbConfig");

const addPlan = plan => {
  console.log("checking what this plan is", plan);
  return db("plans").insert(plan, "id");
};

// list of all plans
const getPlans = () => {
  return db("plans");
};

// list of project plans
const getProjectPlans = project_id => {
  return db("plans").where({ project_id });
};

// list of developer plans
const getDeveloperPlans = user_id => {
  return db("plans").where({ user_id });
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

const getDeveloperCompletedPlans = user_id => {
  return db("plans")
    .select({
      planID: "plans.id",
      planName: "plans.name",
      feedback: "projects.feedback",
      projectID: "projects.id",
      projectName: "projects.name",
      projectOwnerID: "projects.user_id",
      projectOwnerFirstName: "users.firstName",
      projectOwnerLastName: "users.lastName"
    })
    .innerJoin("projects", "projects.id", "plans.project_id")
    .innerJoin("users", "projects.user_id", "users.id")
    .where({ "plans.user_id": user_id })
    .andWhere({ "plans.planStatus": "completed" });
};

module.exports = {
  getPlans,
  getDeveloperPlans,
  getProjectPlans,
  getPlanById,
  addPlan,
  updatePlan,
  deletePlan,
  getDeveloperCompletedPlans
};
