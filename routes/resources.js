"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    
    knex('resources').insert({
      title: req.body.title, 
      url: req.body.url, 
      user_id: 6
    }).then(() => {
      res.render("index");
    });
  });

  return router;
}
