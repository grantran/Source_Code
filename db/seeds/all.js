
function getId(list) {
  return list[Math.floor(Math.random() * list.length)];
}

exports.seed = function(knex, Promise) {
  return Promise.all([
      knex('users').del(),
      knex('tags').del(),
      knex('resources').del(), 
      knex('likes').del(), 
      knex('resource_tag').del(), 
      knex('comments').del()
    ])
    .then(function () {
      return knex('users').insert([
          {username: 'Alice'},
          {username: 'Bob'},
          {username: 'Charlie'},
          {username: 'Erica'},
          {username: 'Chris'},
          {username: 'Grant'}
      ], 'id');
    })
    .then((users) => {
      return Promise.all([
        users,
        knex('resources').insert([
          {title: 'google', url: 'http://www.google.com', user_id: getId(users), description: 'desc 1'},
          {title: 'stack overflow', url: 'http://stackoverflow.com', user_id: getId(users), description: 'desc 2'},
          {title: 'git hub', url: 'http://github.com', user_id: getId(users), description: 'desc 3'},
          {title: 'knexjs', url: 'http://www.knexjs.org', user_id: getId(users), description: 'desc 4'},
          {title: 'bing', url: 'http://www.bing.com', user_id: getId(users), description: 'desc 5'},
          {title: 'reddit', url: 'http://reddit.com', user_id: getId(users), description: 'desc 6'}
        ], 'id')
      ]);
    })
    .then((all) => {
      // console.log('in comments', all);
      const users = all[0];
      const resources = all[1];

      return Promise.all([
        users, resources, 
      knex('comments').insert([
        {comment: 'this is google', user_id: getId(users), resource_id: getId(resources)},
        {comment: 'this is google', user_id: getId(users), resource_id: getId(resources)},
        {comment: 'this is bing', user_id: getId(users), resource_id: getId(resources)},
        {comment: 'string', user_id: getId(users), resource_id: getId(resources)},
        {comment: 'this is reddit', user_id: getId(users), resource_id: getId(resources)},
        {comment: 'why are you on bing', user_id: getId(users), resource_id: getId(resources)}
        ], 'id')
      ]);
    })
    .then((all) => {
      // console.log('after comments, IN likes', all);
      const users = all[0];
      const resources = all[1];
      const comments = all[2];

      return Promise.all([
        users, resources, comments,
        knex('likes').insert([
          {user_id: getId(users), resource_id: getId(resources)},
          {user_id: getId(users), resource_id: getId(resources)},
          {user_id: getId(users), resource_id: getId(resources)},
          {user_id: getId(users), resource_id: getId(resources)},
          {user_id: getId(users), resource_id: getId(resources)},
          {user_id: getId(users), resource_id: getId(resources)}
        ], 'id')
      ]);
    })
    .then((all) => {
      // console.log('after likes, IN tags', all);

      return Promise.all([
        all[0], all[1], all[2], all[4],
        knex('tags').insert([
          {tags: 'search engine'},
          {tags: 'forum'},
          {tags: 'tool'},
          {tags: 'documentation'}
      ], 'id')
      ]);
    })
    .then((all) => {
      // console.log('last one IN resource_tag', all);
      const resource = all[1];
      const tag = all[4];

      return Promise.all([
        knex('resource_tag').insert([
          {resource_id: getId(resource), tag_id: getId(tag)},
          {resource_id: getId(resource), tag_id: getId(tag)},
          {resource_id: getId(resource), tag_id: getId(tag)},
          {resource_id: getId(resource), tag_id: getId(tag)},
          {resource_id: getId(resource), tag_id: getId(tag)},
          {resource_id: getId(resource), tag_id: getId(tag)}
        ])
      ]);
    })}
