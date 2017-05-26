"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.post('/login', (req, res) => {
    function validUser(){
    for(user in users){
      if(users[user] === req.body.username) {
      req.params.userid = user;
      res.redirect('/');
      return;
    }
    res.status(403).send('Error');
    }
  }
    if(validUser()){
    knex('users').where(
      'username', req.params.userid
    ).select('id').then(function(err, result) {
      if (err) {
        res.status(403).send("Error");
      }
      else {
        res.json(results);
      }
    });
    }
  });

}


