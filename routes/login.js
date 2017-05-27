"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.post('/', (req, res) => {
    const username = req.body.username;
    knex('users').where(
      'username', username
    ).select('id').then(function(results) {
        const user = results[0];
        if(!user) {
          res.status(403);
          res.send('Email and Password cannot be empty.');
          return
        } else {
          req.session.userid = user.id;
          res.redirect("/");
        }
    }).catch( err => {
      res.status(500).send("Error");
      console.error("post to /", err);
    });
  });
  return router;
}
