const db = require("../../data/dbConfig");

// add new plan on project from developer
const addPlan = plan => {
  return db("plans").insert(plan, "id");
};

// list of all plans
// might not need
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

// plan page by plan id
const getPlanById = id => {
  return db("plans")
    .where({ id })
    .first();
};

// update developer plan
// protected route
const updatePlan = async (id, changes) => {
  const editedPlan = await db("plans")
    .where({ id })
    .update(changes);
  if (editedPlan) {
    const updatedPlan = await getPlanById(id);
    return updatedPlan;
  }
};

// delete developer plan
// protected route
const deletePlan = id => {
  return db("plans")
    .where({ id })
    .del(id);
};

// list of developer plans in completed status with feedback
// for feedback on developer page
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
  addPlan,
  getPlans,
  getProjectPlans,
  getDeveloperPlans,
  getPlanById,
  updatePlan,
  deletePlan,
  getDeveloperCompletedPlans
};
