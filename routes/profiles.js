"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // router.post("/", (req, res) => {
  //   console.log(req.body);
  //   knex('resources').insert({
  //     title: req.body.title,
  //     url: req.body.url,
  //     description: req.body.description,
  //     user_id: req.session.userid,
  //     tags: req.body.tags
  //   }).then(() => {
  //     res.redirect("/");
  //   });
  // });

  router.get("/", (req, res) => {

    knex('resources').select("*")
    .leftJoin('users', 'resources.user_id', 'users.id')
    .leftJoin('likes', 'users.id', 'likes.user_id')
    .where({'users.id': req.session.userid})
    .orWhere({'likes.user_id': req.session.userid})
    .then(function(results) {
      console.log(results);
      res.json(results);
    });
  });
  return router;
}