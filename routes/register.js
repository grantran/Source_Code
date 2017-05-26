"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

 router.post('/', (req, res) => {
  let validUsername = req.body;
  console.log("USERNAME IS: " + req.body.username);
    knex('users')
      .insert({username: req.body.username})
      .then((results) => {
      res.json(results);
    })

  });
 return router;
}

