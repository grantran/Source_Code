"use strict";

 //likes should be the joinging table - not joined onto resources
 //also toggle likes to noit be clickable multiple times


const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    knex('resources').select("*")
    .leftJoin('users', 'resources.user_id', 'users.id')
    .leftJoin('likes', 'resources.id', 'likes.resource_id')
    .where({'users.id': req.session.userid})
    .then(function(data) {
      res.json(data);
    });
  });
  return router;
}
