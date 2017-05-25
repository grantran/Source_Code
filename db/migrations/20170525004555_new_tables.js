
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('resources', (table) => {
      table.increments().unsigned().primary();
      table.string('title').notNull();
      table.string('url').notNull();
      table.integer('user_id');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('resource_tag', (table) => {
      table.increments().unsigned().primary();
      table.integer('resource_id');
      table.integer('tag_id');
      table.unique(['resource_id', 'tag_id']);
      table.timestamps(true, true);
    }),
    knex.schema.createTable('tags', (table) => {
      table.increments().unsigned().primary();
      table.string('tags').notNull();
      table.timestamps(true, true);
    }),
    knex.schema.createTable('comments', (table) => {
      table.increments().unsigned().primary();
      table.text('comment').notNull();
      table.integer('user_id');
      table.integer('resource_id');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('likes', (table) => {
      table.increments().unsigned().primary();
      table.boolean('likes');
      table.integer('user_id');
      table.integer('resource_id');
      table.timestamps(true, true);
    }),
    knex.schema.table('users', (table) => {
      table.renameColumn('name', 'username');
      table.timestamps(true, true);
    }) 
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('resources'),
    knex.schema.dropTable('resource_tag'),
    knex.schema.dropTable('tags'),
    knex.schema.dropTable('comments'),
    knex.schema.dropTable('likes'),
    knex.schema.table('users', (table) => {
      table.renameColumn('username', 'name');
      table.dropColumn('created_at');
      table.dropColumn('updated_at');
    })
  ])
};
