const express = require('express');
// const request = require('request');
const proxy = require('http-proxy-middleware');
const servers = ['http://127.0.0.1:3003', 'http://127.0.0.1:3013'];

const app = express();
let currentServer = 0;

app.use('*', (req, res, next) => {
  currentServer = (currentServer + 1) % servers.length;
  next();
});

app.use('*', proxy({target: servers[currentServer], changeOrigin: true}));

app.listen(8080, () => console.log('Load balancer listening on port 8080!'));

  // const selectServer = () => {
  //   currentServer = (currentServer + 1) % servers.length;
  //   return servers[currentServer];
  // }
  
  // app.use('/', proxy(selectServer));
  
  // app.use(proxy(servers[0], {
  //   proxyErrorHandler: (err, res, next) => {
  //     console.log(err)
  //   }
  // }));
  
  // app.use(proxy(servers[1], {
  //   proxyErrorHandler: (err, res, next) => {
  //     console.log(err);
  //   }
  // }));

// app.get('*', (req, res) => {
//   const options = {
//     method: 'GET',
//     uri: servers[currentServer] + req.url,
//   };
//   const serverRequest = request(options).on('error', (err) => {
//     res.status(500).send(err.message);
//     console.log(err.message);
//   });
//   req.pipe(serverRequest).pipe(res);
//   currentServer = (currentServer + 1) % servers.length;
// });

// app.post('*', (req, res) => {
//   const options = {
//     method: 'POST',
//     uri: servers[currentServer] + req.url,
//     body: req.body,
//   };
//   const serverRequest = request(options).on('error', (err) => {
//     res.status(500).send(err.message);
//     console.log(err.message);
//   });
//   req.pipe(serverRequest).pipe(res);
//   currentServer = (currentServer + 1) % servers.length;
// });

// app.put('*', (req, res) => {
//   const options = {
//     method: 'PUT',
//     uri: servers[currentServer] + req.url,
//     body: req.body,
//   };
//   const serverRequest = request(options).on('error', (err) => {
//     res.status(500).send(err.message);
//   });
//   req.pipe(serverRequest).pipe(res);
//   currentServer = (currentServer + 1) % servers.length;
// });

// app.delete('*', (req, res) => {
//   const options = {
//     method: 'DELETE',
//     uri: servers[currentServer] + req.url,
//   };
//   const serverRequest = request(options).on('error', (err) => {
//     res.status(500).send(err.message);
//   });
//   req.pipe(serverRequest).pipe(res);
//   currentServer = (currentServer + 1) % servers.length;
// });




