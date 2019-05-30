const faker = require('faker');

const roles = ["Project Owner","Developer"];

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      const userArr = [{
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        role: "Admin"
      }];

      for(let i = 0; i < 99; i++){
        const user = {};
        let role = Math.floor(Math.random() * 2);
        let userName = faker.internet.userName();

        user.firstName = faker.name.firstName();
        user.lastName = faker.name.lastName();
        user.email = faker.internet.email();
        user.role = roles[role];
        role === 1 ? user.skills = faker.lorem.words() : null;
        user.linkedIn = `https://www.linkedin.com/in/${userName}`;
        user.gitHub = `https://www.github.com/${userName}`;
        user.twitter = `https://www.twitter.com/${userName}`;

        userArr.push(user);
      }
        return knex('users').insert(userArr);
    });
};
