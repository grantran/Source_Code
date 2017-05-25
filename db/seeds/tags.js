
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('tags').insert({id: 1, tags: 'search engine'}),
        knex('tags').insert({id: 2, tags: 'forum'}),
        knex('tags').insert({id: 3, tags: 'tool'}),
        knex('tags').insert({id: 4, tags: 'documentation'})

      ]);
    });
};
