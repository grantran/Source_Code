"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    console.log(req.body);
    knex('resources').insert({
      title: req.body.title, 
      url: req.body.url,
      description: req.body.description, 
      user_id: req.session.userid
    }).then(() => {
      res.redirect("/");
    });
  });

    router.get("/", (req, res) => {
    knex('resources').select("*")
    // .from('resources')
    // .leftJoin('comments', 'resources.id', 'comments.resource_id')
    // .leftJoin('likes', 'resources.id', 'likes.resource_id')
    .then(function(results) {
      // console.log(results);
      res.json(results);
    });
  });
  return router;
}
