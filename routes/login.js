"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  // router.get('/', (req, res) => {
  //   const username = req.params.username;
  //   res.render('index', username);
  // })


  router.post('/', (req, res) => {
    // TODO Check why params.username is empty
    const username = req.body.username;

    knex('users').where(
      'username', username
    ).select('id').then(function(results) {
        // TODO You have to find how to get the user from the results
        const user = results[0];

        // console.log("result", result);
        if(!user) {
          res.status(403);
          res.send('Email and Password cannot be empty.');
          return
        } else {
          req.session.userid = user.id;
          res.redirect("/");
        }
        //res.cookie() (if cookie is not stored)
    }).catch( err => {
      res.status(500).send("Error");
      console.error("post to /", err);
    });
  });
  return router;
}
