"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

   router.post('/', (req, res) => {
    console.log("chris1")
    let validUsername = req.body;
    console.log("USERNAME IS: " + req.body.username);

    // if(typeof validUsername.username.trim() != '') {
    //   res.status(403).send("Error");

      knex('users')
        .insert({username: req.body.username})
        .then((results) => {
        res.json(results);
        })

  });
  return router;
}
