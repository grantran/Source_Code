"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    knex('resources').select("*")
    .leftJoin('users', 'resources.user_id', 'users.id')
    .leftJoin('likes', 'resources.id', 'likes.resource_id')
    .where({'users.id': req.session.userid})
    .then(function(data) {
      console.log(data, 'before i send');
      res.json(data);
    });
  });
  return router;
}