"use strict";

const express = require('express');
const router  = express.Router();

//Route is not used 

module.exports = (knex) => {
  router.post("/", (req, res) => {
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