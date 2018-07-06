const newRelic = require('newrelic');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const reviewsRoute = require('./reviews');

const app1 = express();

// use morgan to log incoming reuests
app1.use(morgan('dev'));

// use body-parser to parse the request bodies
app1.use(bodyParser.json());

// handle cors
/* eslint-disable consistent-return */
app1.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Mehods',
      'GET, POST, PUT, PATCH, DELETE',
    );
    return res.status(200).json({});
  }
  next();
});

/* eslint-enable consistent-return */

// serve up the pages
app1.use('/', express.static(path.join(__dirname, '../public')));
app1.get('/favicon.ico', (req, res) => res.status(204));

// handle /reviews routes
app1.use('/reviews', reviewsRoute);

// handle error
app1.use((req, res, next) => {
  const error = new Error('Not found');
  res.status(404).json('Not Found');
});

/* eslint-disable no-unused-vars */
// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message,
//     },
//   });
// });
/* eslint-enable no-unused-vars */

// determine listening port
const port1 = process.env.port1 || 3003;
app1.set('host', '127.0.0.1');
const server1 = http.createServer(app1);

module.exports = server1;

if (!module.parent) {
  server1.listen(port1, () => console.log(`reviews server 1 listening on ${port1}`));
}

