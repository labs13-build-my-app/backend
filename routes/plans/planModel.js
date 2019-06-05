const db = require("../../data/dbConfig.js");

const getPlans = () => {
  db("plans").then(plans => {
    console.log(plans);
  });
};

module.exports = {
  getPlans
  //   getPlanbyID,
  //   addPlan,
  //   updatePlan,
  //   deletePlan
};
