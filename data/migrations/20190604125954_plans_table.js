exports.up = function(knex, Promise) {
  return knex.schema.createTable("plans", tbl => {
    tbl.increments();
    tbl.string("name", 255).notNullable();
    tbl.text("description").notNullable();
    tbl.string("technologiesToUse", 255).notNullable();
    tbl.integer("budget").notNullable();
    tbl.text("dueDate").notNullable();
    tbl.string("planStatus", 30).notNullable();
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .integer("project_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("plans");
};
