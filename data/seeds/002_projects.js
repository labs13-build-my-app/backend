const faker = require("faker");
require("dotenv").config();

exports.seed = function(knex, Promise) {
  return knex("projects")
    .del()
    .then(function() {
      let projectsArr = [];
      let projectStatusArr = ["proposal", "in progress", "completed"];
      let paymentStatusArr = ["paid", "unpaid"];
      for (let i = 0; i < Number(process.env.PROJECTS); i++) {
        const project = {};
        const statusProject = Math.floor(Math.random() * 3);
        const paymentStatus = Math.floor(Math.random() * 2);
        project.name = faker.company.companyName();
        project.description = faker.lorem.paragraph();
        project.image_url = faker.image.imageUrl();
        project.budget = Math.round(faker.finance.amount() * 100);
        project.dueDate = faker.date.future();
        project.projectStatus = projectStatusArr[statusProject];
        project.paymentStatus = paymentStatusArr[paymentStatus];
        project.projectStatus === "completed"
          ? (project.feedback = faker.lorem.paragraph())
          : null;
        project.user_id =
          Math.floor(Math.random() * (process.env.PROJECTS - 52)) + 51;
        projectsArr.push(project);
      }

      return knex("projects").insert(projectsArr);
    });
};
