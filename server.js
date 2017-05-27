"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const cookieSession = require('cookie-session');
const request = require('request');
const ogs = require('open-graph-scraper')
// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const register    = require("./routes/register");
const login       = require("./routes/login");
const resourcesRoutes = require("./routes/resources");
const commentsRoutes = require("./routes/comments");
const likebutton  = require("./routes/likebutton")
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cookieSession({
  name: 'session',
  keys: ['1q2w3e4r5t6y', 'qawsedrftgyh']
}));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));
app.use(flash());
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
// Mount all resource routes
app.use("/register", register(knex));
app.use("/login", login(knex));
app.use("/api/users", usersRoutes(knex));
app.use("/api/resources", resourcesRoutes(knex));
app.use("/api/comments", commentsRoutes(knex));
app.use("/likebutton", likebutton(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect('/');
});


var newSeeds = [
  {
    id: 1,
    url: 'https://github.com/sindresorhus/gulp-autoprefixer'
  }, {
    id: 2,
    url: 'https://www.vagrantup.com/intro/getting-started/up.html'
  }, {
    id: 3,
    url: 'https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code/'
  }, {
    id: 4,
    url: 'http://youmightnotneedjquery.com/'
  }, {
    id: 5,
    url: 'https://stackoverflow.com/questions/7410063/how-can-i-listen-to-the-form-submit-event-in-javascript'
  }, {
    id: 6,
    url: 'https://vim-adventures.com'
  }, {
    id: 7,
    url: 'http://www.uxbooth.com/articles/the-new-rules-of-form-design/'
  }, {
    id: 8,
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes'
  }, {
    id: 9,
    url: 'https://colorlib.com/wp/free-flat-social-media-icons-sets/'
  }, {
    id: 10,
    url: 'https://osvaldas.info/image-lightbox-responsive-touch-friendly'
  }
];

app.get('/getOgs', (req, res) =>{
  const imageData = []
  newSeeds.forEach(function (resource, id) {

    ogs({url: resource.url}, function(err, results){
      var image = results.data.ogImage
      if(image){
        image = image.url
      }else{
        image = "http://placehold.it/400x400"
      }
      imageData.push({

        id: resource.id,
        title: results.data.ogTitle,
        description: results.data.ogDescription,
        imageURL: image,
        url: resource.url
      })
      console.log(results.data)

        if (imageData.length === newSeeds.length) {
          JSON.stringify(imageData);
          res.json(imageData);
      }

    })

  })
})

app.get('/getJSON', (req, res) => {
  const JSONseeds = [];
  newSeeds.forEach(function (resource, id) {
    request.get(resource.url, function (err, response, body) {
      let result = {
        id: resource.id,
        body: body
      };
      JSONseeds.push(result);
      if (JSONseeds.length === newSeeds.length) {
        JSON.stringify(JSONseeds);
        res.send(JSONseeds);
      }
    });
  });
});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

