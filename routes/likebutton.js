"use strict";
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.post("/:id", (req, res) => {
    const user = req.session.userid;
    const resource = req.params.id;
    console.log(user, "user id");
    console.log(resource, "resource id");

    if(!user){
      res.redirect('/');
      return;
    }

    knex('likes')
      .insert({
        likes: "5"
      })
      .select('likes')
      .then(function(results){
        console.log(results);
        results += 1;
      res.render("index", results);
    });
  });
  return router;
}
/* try later this version */
  // knex('likes')
  //     .truncate()
  //     .select('likes')
  //     .then(function(results) => {
  //       console.log(results);
  //       results += 1;
  //     res.render("index");
  //   });


