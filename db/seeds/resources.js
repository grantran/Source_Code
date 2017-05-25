exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('resources').insert({id: 1, title: 'google', url: 'http://www.google.com', user_id: 1}),
        knex('resources').insert({id: 2, title: 'stack overflow', url: 'http://stackoverflow.com', user_id: 2}),
        knex('resources').insert({id: 3, title: 'git hub', url: 'http://github.com', user_id: 3}),
        knex('resources').insert({id: 4, title: 'knexjs', url: 'http://www.knexjs.org', user_id: 4}),
        knex('resources').insert({id: 5, title: 'bing', url: 'http://www.bing.com', user_id: 5}),
        knex('resources').insert({id: 6, title: 'reddit', url: 'http://reddit.com', user_id: 6})
      ]);
    });
};
