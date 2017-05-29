"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {


  router.get("/", (req, res) => {
    knex('resources').select("*")
    .then(function(results) {
      // console.log(results);
      res.json(results);
    });
  });

  return router;
}
