const faker = require("faker");
require("dotenv").config();
const roles = ["Project Owner", "Developer"];
const devTypes = ["web", "android", "iOS"];

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

      for (let i = 0; i < Number(process.env.USERS); i++) {
        const user = {};
        let role = Math.floor(Math.random() * 2);
        let devType = Math.floor(Math.random() * 3);
        let userName = faker.internet.userName();
        user.firstName = faker.name.firstName();
        user.lastName = faker.name.lastName();
        user.email = faker.internet.email();
        user.role = roles[role];
        role === 1 ? (user.skills = faker.lorem.words()) : null;
        role === 1 ? (user.devType = devTypes[devType]) : null;

        user.linkedIn = `https://www.linkedin.com/in/${userName}`;
        user.gitHub = `https://www.github.com/${userName}`;
        user.twitter = `https://www.twitter.com/${userName}`;
        userArr.push(user);
      }
      return knex("users").insert(userArr);
    });
};
