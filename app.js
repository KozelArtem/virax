const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const passport = require('./lib/passport');
const routes = require('./routes');

const app = express();

app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path} Auth: ${!req.headers.authorization}`);
  next();
});

app.use(routes);

http.createServer(app).listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});
