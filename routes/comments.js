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
    })
  });

  return router;
}