"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    knex('comments').insert({
      comment: req.body.comment, 
      user_id: req.session.userid,
      resource_id: RESOURCEID
    }).then(() => {
      res.end();
    });
  });

  router.get("/", (req, res) => {
    knex('comments').select("*")
    .where({'resource_id': req.query.id})
    .then((results) => {
    res.json(results);
    });
  })
  return router;
}