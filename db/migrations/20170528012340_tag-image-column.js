
exports.up = function(knex, Promise) {
  return knex.schema.table('resources', (table) => {
    table.text('tags');
    table.text('image');
  })
};


exports.down = function(knex, Promise) {
  return knex.schema.table('resources', (table) => {
    table.dropColumn('tags');
    table.dropColumn('image');
})
};
