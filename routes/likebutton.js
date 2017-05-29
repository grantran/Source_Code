"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/:resourceid", (req, res) => {
    // console.log(req);
    knex('likes').insert({
      likes: true,
      user_id: req.session.userid,
      resource_id: req.params.resourceid
    }).then(() => {
      res.end();
    });
  });
  return router;
}