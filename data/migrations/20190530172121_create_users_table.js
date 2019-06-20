exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl
      .string("sub")
      .unique()
      .notNullable();
    tbl.string("firstName", 255).notNullable();
    tbl.string("lastName", 255).notNullable();
    tbl
      .string("email", 255)
      .notNullable()
      .unique();
    tbl.string("role", 15).notNullable();
    tbl.text("skills");
    tbl.text("devType");
    tbl.string("linkedIn");
    tbl.string("gitHub");
    tbl.string("twitter");
    tbl.string("profile_picture_url");
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
