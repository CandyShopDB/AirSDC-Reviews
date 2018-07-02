const newRelic = require('newrelic');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const reviewsRoute = require('./reviews');


const app1 = express();
const app2 = express();

// use morgan to log incoming reuests
// app.use(morgan('dev'));

// use body-parser to parse the request bodies
app.use(bodyParser.json());
// handle cors
/* eslint-disable consistent-return */
app.use((req, res, next) => {
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
app.use('/', express.static(path.join(__dirname, '../public')));
app.get('/favicon.ico', (req, res) => res.status(204));

// handle /reviews routes
app.use('/reviews', reviewsRoute);

// handle error
app.use((req, res, next) => {
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
const port2 = process.env.port2 || 3013;
const server1 = http.createServer(app1);
const server2 = http.createServer(app2);


module.exports = server;

if (!module.parent) {
  server1.listen(port1);
  server2.listen(port2);
  console.log(`reviews server 1 listening on ${port1}`);
  console.log(`reviews server 2 listening on ${port2}`);
}

