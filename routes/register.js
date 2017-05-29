"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
 router.post('/', (req, res) => {
  let validUsername = req.body;
    knex('users')
      .insert({username: req.body.username}, 'id')
      .then((results) => {
          req.session.userid = results[0];
          res.redirect("/");
      })
  });

 return router;
}

