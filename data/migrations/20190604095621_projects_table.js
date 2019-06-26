exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", tbl => {
    tbl.increments();
    tbl.string("name", 255).notNullable();
    tbl.text("description").notNullable();
    tbl.string("image_url");
    tbl.integer("budget").notNullable();
    tbl.date("dueDate").notNullable();
    tbl.string("projectStatus", 30).notNullable();
    tbl.string("paymentStatus", 30).notNullable();
    tbl.text("feedback");
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
