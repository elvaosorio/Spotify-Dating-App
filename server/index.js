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
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
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

// User API routes
app.get("/api/users", (req, res, next) => {
  Users.query().then(users => {
    res.send(users);
  }).catch(next); // Proper error handling
});

app.post("/api/users", (req, res, next) => {
  const newUser = { ...req.body };
  Users.query()
    .insertAndFetch(newUser)
    .then(users => {
      res.send(users);
    }).catch(next);
});

app.put('/api/users/:id', (req, res, next) => {
  const updatedUser = { ...req.body };
  Users.query()
    .updateAndFetchById(req.params.id, updatedUser)
    .then(users => {
      res.send(users);
    }).catch(next);
});

app.delete('/api/users/:id', (req, res, next) => {
  Users.query()
    .deleteById(req.params.id)
    .then(() => { 
      res.sendStatus(200);
    }).catch(next);
});

// Error handling middleware
const { wrapError, DBError } = require("db-errors");

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  
  const wrappedError = wrapError(error);
  
  if (wrappedError instanceof DBError) {
    return res.status(400).send(wrappedError.data || wrappedError.message || {});
  } else {
    return res.status(wrappedError.statusCode || wrappedError.status || 500)
              .send(wrappedError.data || wrappedError.message || {});
  }
});

// Start the server
const server = app.listen(process.env.PORT || 3001, () => {
  console.log("Listening on port %d", server.address().port); // eslint-disable-line no-console
});

module.exports = app;
