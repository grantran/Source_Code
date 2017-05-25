"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
   router.post('/register', (req, res) => {
    console.log("chris1")
    let validUsername = req.body;
    if(typeof validUsername.username.trim() != '') {
      res.status(403).send("Error");
    } else {
      knex('users')
        .insert({username: validUsername.username})
        .then((results) => {
        res.json(results);
        })
    }
  });
  return router;
}


