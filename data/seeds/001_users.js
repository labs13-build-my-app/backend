const faker = require("faker");
require("dotenv").config();
const roles = ["Project Owner", "Developer"];
const devTypes = ["web", "android", "iOS"];
//99
exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      const userArr = [
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          role: "Admin"
        }
      ];

      for (let i = 0; i < Math.floor(Number(process.env.USERS) / 2); i++) {
        const user = {};
        let devType = Math.floor(Math.random() * 3);
        let userName = faker.internet.userName();
        user.firstName = faker.name.firstName();
        user.lastName = faker.name.lastName();
        user.email = faker.internet.email();
        user.role = "Developer";
        user.skills = faker.lorem.words();
        user.devType = devTypes[devType];
        user.linkedIn = `https://www.linkedin.com/in/${userName}`;
        user.gitHub = `https://www.github.com/${userName}`;
        user.twitter = `https://www.twitter.com/${userName}`;
        userArr.push(user);
      }

      for (let i = 0; i < Math.ceil(Number(process.env.USERS) / 2); i++) {
        const user = {};
        let userName = faker.internet.userName();
        user.firstName = faker.name.firstName();
        user.lastName = faker.name.lastName();
        user.email = faker.internet.email();
        user.role = "Project Owner";
        user.linkedIn = `https://www.linkedin.com/in/${userName}`;
        user.gitHub = `https://www.github.com/${userName}`;
        user.twitter = `https://www.twitter.com/${userName}`;
        userArr.push(user);
      }

      return knex("users").insert(userArr);
    });
};
