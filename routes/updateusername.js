"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    console.log('in route');
    knex('users').select("*")
    .where({'id': req.session.userid})
    .update({
      username: req.body.text
    }).then(() => {
      res.send("hey");
    });
  });

  return router;
}