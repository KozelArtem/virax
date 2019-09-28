const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path} Auth: ${!req.headers.authorization}`);
  next();
});

http.createServer(app).listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});
