
/* eslint-disable camelcase */
/* eslint-disable no-console */
const http = require("http");

const express = require("express");
const request = require("request");
const querystring = require("querystring");
const bodyParser = require('body-parser'); 
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[process.env.NODE_ENV || "development"]);
const { Model } = require("objection");
const Users = require("./models/Users");

Model.knex(knex);

const app = express();

const redirect_uri =
  process.env.REDIRECT_URI || "http://localhost:3001/api/callback";

app.use(bodyParser.json());
app.get("/login", function(req, res) {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: "user-top-read user-read-email",
        redirect_uri
      })
  );
});

app.get("/callback", function(req, res) {
  let code = req.query.code || null;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri,
      grant_type: "authorization_code"
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64")
    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token;
    let uri = process.env.FRONTEND_URI || "http://localhost:3001";
    res.redirect(uri + "?access_token=" + access_token);
  });
});

app.get("/api/users", (request, response, next) => {
  Users.query().then(users => {
    response.send(users);
  }, next); // <- Notice the "next" function as the rejection handler
});

app.post("/api/users", (request, response, next) => {
  const newUser = { ...request.body };
  console.log(request);
  Users.query()
    .insertAndFetch(newUser)
    .then(users => {
      response.send(users);
    }, next);
});

app.put(
  '/api/users/:id',
  (request, response, next) => {
    const {...updatedUser } = {
      ...request.body
    }; // eslint-disable-line no-unused-vars
    Users.query()
      .updateAndFetchById(request.params.id, updatedUser)
      .then((users) => {
        response.send(users);
      }, next);
      console.log(request.params.user_name);
  }
);
/* eslint-disable no-unused-vars */
app.delete(
  '/api/users/:id',
  (request, response, next) => {
    Users.query()
      .deleteById(request.params.id)
      .then((result) => { 
        response.sendStatus(200);
      }, next);
      console.log("request.params.id");
      console.log(request.params.id);
  }
);
/* eslint-disable no-unused-vars */
// db-errors provides a consistent wrapper around database errors
const { wrapError, DBError } = require("db-errors");

app.use((error, request, response, next) => {
  if (response.headersSent) {
    next(error);
  }
  const wrappedError = wrapError(error);
  if (wrappedError instanceof DBError) {
    response.status(400).send(wrappedError.data || wrappedError.message || {});
  } else {
    response
      .status(wrappedError.statusCode || wrappedError.status || 500)
      .send(wrappedError.data || wrappedError.message || {});
  }
});


//const server = http.createServer(app).listen(process.env.PORT || 3001);
module.exports = app;

//console.log("Listening on port %d", server.address().port); // eslint-disable-line no-console