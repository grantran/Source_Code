
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('resource_tag').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('resource_tag').insert({id: 1, resource_id: 1, tag_id: 1}),
        knex('resource_tag').insert({id: 2, resource_id: 2, tag_id: 2}),
        knex('resource_tag').insert({id: 3, resource_id: 3, tag_id: 3}),
        knex('resource_tag').insert({id: 4, resource_id: 4, tag_id: 4}),
        knex('resource_tag').insert({id: 5, resource_id: 5, tag_id: 1}),
        knex('resource_tag').insert({id: 6, resource_id: 6, tag_id: 2})
      ]);
    });
};
