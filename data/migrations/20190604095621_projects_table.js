exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", tbl => {
    tbl.increments();
    tbl.string("name", 255).notNullable();
    tbl.string("description", 255).notNullable();
    tbl.string("image_url", 255);
    tbl.integer("budget").notNullable();
    tbl.text("dueDate").notNullable();
    tbl.string("projectStatus", 30).notNullable();
    tbl.string("paymentStatus", 30).notNullable();
    tbl.string("feedback", 600);
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projects");
};
