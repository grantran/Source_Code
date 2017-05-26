"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    
    knex('resources').insert({
      title: req.body.title, 
      url: req.body.url, 
      user_id: 6
    }).then(() => {
      res.render("index");
    });
  });

    router.get("/", (req, res) => {
    knex('resources').select("*")
    .from('resources')
    .leftJoin('comments', 'resources.id', 'comments.resource_id')
    // .leftJoin('likes', 'resources.id', 'likes.resource_id')
    .then(function(results) {
      res.json(results);
    });
  });
  return router;
}
