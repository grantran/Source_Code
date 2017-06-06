
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
          {username: 'Charlie'}
      ], 'id');
    })
    .then((users) => {
      return Promise.all([
        users,
        knex('resources').insert([
          {title: 'google', url: 'http://www.google.com', user_id: getId(users),
           description: 'This is google', image: 'http://1.bp.blogspot.com/-5bPNsF5plzw/VnJWs-7RbrI/AAAAAAAARmA/DaZmn8YUjAk/s1600-r/logo_research_at_google_color_1x_web_512dp.png',
           tags: 'search engine'}, 
          {title: 'stack overflow', url: 'http://stackoverflow.com', user_id: getId(users),
           description: 'Stacked', image: 'https://cdn.sstatic.net/Sites/stackoverflow/img/apple-touch-icon@2.png?v=73d79a89bded',
           tags: "forum"},
          {title: 'git hub', url: 'http://github.com', user_id: getId(users),
           description: 'github', image: 'https://marabesi.com/assets/github-badges-php-repository/cover.png',
           tags: 'git'},
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
        {comment: 'this is stacked', user_id: getId(users), resource_id: getId(resources)},
        {comment: 'this is github', user_id: getId(users), resource_id: getId(resources)}
        ], 'id')
      ]);
    })
    } //extra 
    // .then((all) => {
    //   const users = all[0];
    //   const resources = all[1];
    //   const comments = all[2];

    //   return Promise.all([
    //     users, resources, comments,
    //     knex('likes').insert([
    //       {user_id: getId(users), resource_id: getId(resources)},
    //       {user_id: getId(users), resource_id: getId(resources)},
    //       {user_id: getId(users), resource_id: getId(resources)}
    //     ], 'id')
    //   ]);
    // })
    // .then((all) => {

    //   return Promise.all([
    //     all[0], all[1], all[2], all[4],
    //     knex('tags').insert([
    //       {tags: 'search engine'},
    //       {tags: 'forum'},
    //       {tags: 'tool'},
    //       {tags: 'documentation'}
    //   ], 'id')
    //   ]);
    // })
    // .then((all) => {
    //   const resource = all[1];
    //   const tag = all[4];

    //   return Promise.all([
    //     knex('resource_tag').insert([
    //       {resource_id: getId(resource), tag_id: getId(tag)},
    //       {resource_id: getId(resource), tag_id: getId(tag)},
    //       {resource_id: getId(resource), tag_id: getId(tag)}
    //     ])
    //   ]);
    // })}

// exports.seed = function(knex, Promise) {
//   return Promise.all([
//       knex('users').del(),
//       knex('tags').del(),
//       knex('resources').del(), 
//       knex('likes').del(), 
//       knex('resource_tag').del(), 
//       knex('comments').del()
//     ])
// };
