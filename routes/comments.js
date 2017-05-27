"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    knex('comments').insert({
      comment: req.body.text, 
      user_id: req.session.userid,
      resource_id: req.data
    }).then(() => {
      console.log(req);
      res.redirect("/");
    });
  });

  router.get("/", (req, res) => {
    knex('comments').select("*")
    .leftJoin('users', 'comments.user_id', 'users.id')
    .where({'resource_id': req.query.id})
    .then((results) => {
    res.json(results);
    });
  })
  return router;
}