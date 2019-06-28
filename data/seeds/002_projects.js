const faker = require("faker");
require("dotenv").config();

exports.seed = function(knex, Promise) {
  return knex("projects")
    .del()
    .then(function() {
      let projectsArr = [];
      let projectStatusArr = ["proposal", "in progress", "completed"];
      let paymentStatusArr = ["paid", "unpaid"];
      const projectNum = Number(process.env.PROJECTS) || 100;
      for (let i = 0; i < projectNum; i++) {
        const project = {};
        const statusProject = Math.floor(Math.random() * 3);
        const paymentStatus = Math.floor(Math.random() * 2);
        project.name = faker.company.companyName();
        project.description = faker.lorem.paragraph();
        project.image_url = `https://picsum.photos/id/${Math.floor(Math.random()*1001 + 1)}/700`;
        project.budget = Math.round(faker.finance.amount() * 100);
        project.dueDate = faker.date.future();
        project.projectStatus = projectStatusArr[statusProject];
        project.projectStatus === "in progress" ||
        project.projectStatus === "completed"
          ? (project.paymentStatus = paymentStatusArr[paymentStatus])
          : (project.paymentStatus = "unpaid");
        project.projectStatus === "completed"
          ? (project.feedback = faker.lorem.paragraph())
          : null;
        const userNum = process.env.USERS || 50;

        project.user_id =
          Math.floor(Math.random() * (userNum - Math.ceil(userNum / 2) + 1)) +
          Math.ceil(userNum / 2);
        projectsArr.push(project);
      }

      return knex("projects").insert(projectsArr);
    });
};
