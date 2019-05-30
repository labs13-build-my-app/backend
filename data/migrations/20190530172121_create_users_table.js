exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl.string("firstName", 255).notNullable();
    tbl.string("lastName", 255).notNullable();
    tbl
      .string("email", 255)
      .notNullable()
      .unique();
    tbl.string("role", 15).notNullable();
    tbl.text("skills");
    tbl.string("linkedIn").unique();
    tbl.string("gitHub").unique();
    tbl.string("twitter").unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
