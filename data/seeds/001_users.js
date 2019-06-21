const faker = require("faker");
require("dotenv").config();
const devTypes = ["Web", "Android", "iOS"];

exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      const userArr = [
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          role: "Admin",
          sub: "admin"
        }
      ];
      const devNum = Math.floor(Number(process.env.USERS) / 2) || 24;
      const projectOwnerNum = Math.ceil(Number(process.env.USERS) / 2) || 25;
      for (let i = 0; i < devNum; i++) {
        const user = {};
        let devType = Math.floor(Math.random() * 3);
        let userName = faker.internet.userName();
        user.sub = (i + 1).toString();
        user.firstName = faker.name.firstName();
        user.lastName = faker.name.lastName();
        user.email = faker.internet.email();
        user.role = "Developer";
        user.skills = faker.lorem.words();
        user.devType = devTypes[devType];
        user.linkedIn = `https://www.linkedin.com/in/${userName}`;
        user.gitHub = `https://www.github.com/${userName}`;
        user.twitter = `https://www.twitter.com/${userName}`;
        user.profile_picture_url = faker.image.avatar();
        userArr.push(user);
      }

      for (let i = 0; i < projectOwnerNum; i++) {
        const user = {};
        let userName = faker.internet.userName();
        user.sub = (i + projectOwnerNum + 1).toString();
        user.firstName = faker.name.firstName();
        user.lastName = faker.name.lastName();
        user.email = faker.internet.email();
        user.profile_picture_url = faker.image.avatar();
        user.role = "Project Owner";
        user.linkedIn = `https://www.linkedin.com/in/${userName}`;
        user.gitHub = `https://www.github.com/${userName}`;
        user.twitter = `https://www.twitter.com/${userName}`;
        userArr.push(user);
      }

      return knex("users").insert(userArr);
    });
};
