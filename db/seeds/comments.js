
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({id: 1, comment: 'this is google', user_id: 1, resource_id: 1}),
        knex('comments').insert({id: 2, comment: 'this is stack', user_id: 2, resource_id: 2}),
        knex('comments').insert({id: 3, comment: 'this is github', user_id: 3, resource_id: 3}),
        knex('comments').insert({id: 4, comment: 'this is knexjs', user_id: 4, resource_id: 4}),
        knex('comments').insert({id: 5, comment: 'this is bing', user_id: 5, resource_id: 5}),
        knex('comments').insert({id: 6, comment: 'this is reddit', user_id: 6, resource_id: 6}),
        knex('comments').insert({id: 7, comment: 'why are you on bing', user_id: 6, resource_id: 5})
      ]);
    });
};
