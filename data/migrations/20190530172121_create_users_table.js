exports.up = function(knex, Promise) {
  return (
    knex.schema.createTable("users", tbl => {
      tbl.increments();
      tbl
        .integer("sub")
        .notNullable()
        .unique();
      tbl.string("username", 15).notNullable();
      tbl.string("role", 15).notNullable();
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
    }),
    knex.schema.createTable("user_details", tbl => {
      tbl
        .foreign("user_id")
        .references("users.id")
        .unique();
      tbl.string("linkedIn", 512);
      tbl.string("twitter", 512);
      tbl.string("github", 512);
    }),
    knex.schema.createTable("project_owner", tbl => {
      tbl
        .foreign("user_id")
        .references("users.id")
        .unique()
        .notNullable();
    }),
    knex.schema.createTable("developer", tbl => {
      tbl
        .foreign("user_id")
        .references("users.id")
        .unique()
        .notNullable();
      tbl
        .foreign("current_project")
        .references("proposal.id")
        .unique()
        .notNullable();
    }),
    knex.schema.createTable("skills", tbl => {
      tbl.increments();
      tbl
        .foreign("developer_id")
        .references("developer.id")
        .unique()
        .notNullable();
      tbl.string("skill", 128).notNullable();
    }),
    knex.schema.createTable("proposals", tbl => {
      tbl.increments();
      tbl
        .foreign("project_owner_id")
        .references("project_owner.id")
        .unique()
        .notNullable();
      tbl.string("status", 128).notNullable();
      tbl.string("description").notNullable();
      tbl.integer("budget").notNullable();
      tbl.timestamp("deadline").notNullable();
      tbl.integer("final_budget").notNullable();
      tbl.integer("total_payout").notNullable();
      tbl.boolean("payment_recieved").notNullable();
      tbl.boolean("project_owner_notified").notNullable();
      tbl.boolean("project_complete").notNullable();
      tbl.boolean("payment_processed").notNullable();
      tbl.boolean("display_feedback").notNullable();
      tbl.boolean("plan_accepted").notNullable();
      tbl.integer("bank").notNullable();
      tbl.integer("rating");
      tbl.string("feedback");
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
    }),
    knex.schema.createTable("features", tbl => {
      tbl.increments();
      tbl
        .foreign("proposal_id")
        .references("proposal.id")
        .unique()
        .notNullable();
      tbl.string("feature", 128).notNullable();
    }),
    knex.schema.createTable("proposal_images", tbl => {
      tbl.increments();
      tbl
        .foreign("proposal_id")
        .references("proposal.id")
        .unique()
        .notNullable();
      tbl.string("image_url").notNullable();
    }),
    knex.schema.createTable("plans", tbl => {
      tbl.increments();
      tbl
        .foreign("developer_id")
        .references("developer.id")
        .notNullable();
      tbl
        .foreign("proposal_id")
        .references("proposal.id")
        .unique()
        .notNullable();
      tbl.string("description").notNullable();
      tbl.integer("cost").notNullable();
      tbl.timestamp("target_date").notNullable();
      tbl.boolean("plan_accepted").notNullable();
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
    })
  );
};

exports.down = function(knex, Promise) {
  return (
    knex.schema.dropTableIfExists("users"),
    knex.schema.dropTableIfExists("user_details"),
    knex.schema.dropTableIfExists("project_owner"),
    knex.schema.dropTableIfExists("developer"),
    knex.schema.dropTableIfExists("skills"),
    knex.schema.dropTableIfExists("proposal"),
    knex.schema.dropTableIfExists("features"),
    knex.schema.dropTableIfExists("proposal_images"),
    knex.schema.dropTableIfExists("plans")
  );
};
