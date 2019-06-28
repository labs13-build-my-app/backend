const faker = require('faker');

exports.seed = function(knex, Promise) {
  return knex('plans')
    .del()
    .then(function () {
      const plans = [];
      const statusOptions = ['submitted', 'selected', 'completed'];
      const devNum = Math.floor(Number(process.env.USERS) / 2) || 24;
      const planNum = Math.floor(Number(process.env.PLANS)) || 100;
      const projectNum = Number(process.env.PROJECTS) || 100;
      
      for(let i = 0; i < planNum; i++){
        const plan = {};
        
        plan.name = faker.company.bsBuzz();
        plan.description = faker.lorem.paragraphs();
        plan.technologiesToUse = faker.hacker.noun();
        for(let j = 0; j < Math.floor(Math.random()*5); j++){
          plan.technologiesToUse += ` ${faker.hacker.noun()}`;
        }
        plan.budget = Math.round(faker.finance.amount() * 100);
        plan.dueDate = faker.date.future();
        plan.planStatus = statusOptions[Math.floor(Math.random()*3)];
        plan.user_id = Math.floor(Math.random()* (devNum - 1) + 2);
        plan.project_id = Math.floor(Math.random()* projectNum + 1);

        plans.push(plan);
      }

      return knex('plans').insert(plans);
    });
};
