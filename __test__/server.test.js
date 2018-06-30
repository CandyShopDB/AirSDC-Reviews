// const request = require('supertest');
const request = require('request');
const server = require('../server/index');
const db = require('../database/indexSDC');
const { Pool, Client } = require('pg');
const config = require('../database/config');

db.client.end();

describe('Test the root endpoint', () => {
  let newClient;
  beforeEach(() => {
    newClient = new Client(config);
    newClient.connect()
      .then(() => console.log('Connected to the PostgreSQL db'))
      .catch(err => console.log(err));
  });
  afterEach(() => {
    newClient.end();
  });
  test('should serve up static html file on GET', (done) => {
    const options = {
      method: 'GET',
      uri: 'http://127.0.0.1:3003/',
    };
    request(options, (err, response, body) => {
      if (err) {
        console.error(err);
      } else {
        expect(response.statusCode).toBe(200);
        expect(response.body.includes('<!DOCTYPE html>')).toBe(true);
        done();
      }
    });
  });
});

describe('Test the "/reviews/:roomId" GET route', () => {
  let newClient;
  beforeEach(() => {
    newClient = new Client(config);
    newClient.connect()
      .then(() => console.log('Connected to the PostgreSQL db'))
      .catch(err => console.log(err));
  });
  afterEach(() => {
    newClient.end();
  });
  test('should respond with room / reviews data from top 10% DB (1)', (done) => {
    const options = {
      method: 'GET',
      uri: 'http://127.0.0.1:3003/reviews/10000?pageonly=0&start=0&limit=7',
    };
    request(options, (err, response, body) => {
      if (err) {
        console.error(err);
      } else {
        expect(response.statusCode).toBe(200);
        response.body = JSON.parse(response.body);
        expect(typeof response.body.totalNumberResults).toBe('number');
        expect(response.body.totalNumberResults).toBeGreaterThan(0);
        expect(typeof response.body.roomInfo).toBe('object');
        expect(typeof response.body.reviews).toBe('object');
        expect(response.body.reviews.length).toBeGreaterThan(0);
        done();
      }
    });
  });

  test('should respond with room / reviews data from top 10% DB (2)', (done) => {
    const options = {
      method: 'GET',
      uri: 'http://127.0.0.1:3003/reviews/100000?pageonly=0&start=0&limit=7',
    };
    request(options, (err, response, body) => {
      if (err) {
        console.error(err);
      } else {
        expect(response.statusCode).toBe(200);
        response.body = JSON.parse(response.body);
        expect(typeof response.body.totalNumberResults).toBe('number');
        expect(response.body.totalNumberResults).toBeGreaterThan(0);
        expect(typeof response.body.roomInfo).toBe('object');
        expect(typeof response.body.reviews).toBe('object');
        expect(response.body.reviews.length).toBeGreaterThan(0);
        done();
      }
    });
  });

  test('should respond with room / reviews data from 50% DB (1)', (done) => {
    const options = {
      method: 'GET',
      uri: 'http://127.0.0.1:3003/reviews/4000000?pageonly=0&start=0&limit=7',
    };
    request(options, (err, response, body) => {
      if (err) {
        console.error(err);
      } else {
        expect(response.statusCode).toBe(200);
        response.body = JSON.parse(response.body);
        expect(typeof response.body.totalNumberResults).toBe('number');
        expect(response.body.totalNumberResults).toBeGreaterThan(0);
        expect(typeof response.body.roomInfo).toBe('object');
        expect(typeof response.body.reviews).toBe('object');
        expect(response.body.reviews.length).toBeGreaterThan(0);
        done();
      }
    });
  });

  test('should respond with room / reviews data from 50% DB (2)', (done) => {
    const options = {
      method: 'GET',
      uri: 'http://127.0.0.1:3003/reviews/6000000?pageonly=0&start=0&limit=7',
    };
    request(options, (err, response, body) => {
      if (err) {
        console.error(err);
      } else {
        expect(response.statusCode).toBe(200);
        response.body = JSON.parse(response.body);
        expect(typeof response.body.totalNumberResults).toBe('number');
        expect(response.body.totalNumberResults).toBeGreaterThan(0);
        expect(typeof response.body.roomInfo).toBe('object');
        expect(typeof response.body.reviews).toBe('object');
        expect(response.body.reviews.length).toBeGreaterThan(0);
        done();
      }
    });
  });

  test('should respond with room / reviews data from bottom 10% DB (1)', (done) => {
    const options = {
      method: 'GET',
      uri: 'http://127.0.0.1:3003/reviews/9000000?pageonly=0&start=0&limit=7',
    };
    request(options, (err, response, body) => {
      if (err) {
        console.error(err);
      } else {
        expect(response.statusCode).toBe(200);
        response.body = JSON.parse(response.body);
        expect(typeof response.body.totalNumberResults).toBe('number');
        expect(response.body.totalNumberResults).toBeGreaterThan(0);
        expect(typeof response.body.roomInfo).toBe('object');
        expect(typeof response.body.reviews).toBe('object');
        expect(response.body.reviews.length).toBeGreaterThan(0);
        done();
      }
    });
  });

  test('should respond with room / reviews data from bottom 10% DB (2)', (done) => {
    const options = {
      method: 'GET',
      uri: 'http://127.0.0.1:3003/reviews/10000000?pageonly=0&start=0&limit=7',
    };
    request(options, (err, response, body) => {
      if (err) {
        console.error(err);
      } else {
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(body);
        expect(typeof data.totalNumberResults).toBe('number');
        expect(data.totalNumberResults).toBeGreaterThan(0);
        expect(typeof data.roomInfo).toBe('object');
        expect(typeof data.reviews).toBe('object');
        expect(data.reviews.length).toBeGreaterThan(0);
        done();
      }
    });
  });
});

describe('Test the "/reviews/:roomId" POST route', () => {
  let newClient;
  beforeEach(() => {
    newClient = new Client(config);
    newClient.connect()
      .then(() => console.log('Connected to the PostgreSQL db'))
      .catch(err => console.log(err));
  });
  afterEach(() => {
    newClient.query('DELETE FROM reviews WHERE id = (SELECT id FROM reviews ORDER BY id DESC LIMIT 1)')
      .then(() => newClient.end())
      .catch(err => console.error(err));
    // newClient.end();
  });
  test('should successfully insert a review', (done) => {
    const options = {
      method: 'POST',
      uri: 'http://127.0.0.1:3003/reviews/5555555',
      body: {
        userId: 999,
        roomId: 999,
        text: 'Hola!',
        date: '2018-08-08',
        accuracy: 5,
        communication: 5,
        cleanliness: 5,
        location: 5,
        checkIn: 5,
        value: 5,
      },
      json: true,
    };
    request(options, async (err, response, body) => {
      if (err) {
        console.error(err);
      } else {
        expect(response.statusCode).toBe(201);
        const review = await newClient.query('SELECT * FROM reviews ORDER BY id DESC LIMIT 1');
        expect(review.rows[0].userid).toBe(options.body.userId);
        expect(review.rows[0].roomid).toBe(options.body.roomId);
        expect(review.rows[0].text).toBe(options.body.text);
        expect(review.rows[0].accuracy).toBe(options.body.accuracy);
        expect(review.rows[0].communication).toBe(options.body.communication);
        expect(review.rows[0].cleanliness).toBe(options.body.cleanliness);
        expect(review.rows[0].location).toBe(options.body.location);
        expect(review.rows[0].checkin).toBe(options.body.checkIn);
        expect(review.rows[0].value).toBe(options.body.value);
        done();
      }
    });
  });
});

describe('Test the "/reviews/:roomId" PUT route', () => {
  let newClient;
  beforeEach(async () => {
    newClient = new Client(config);
    newClient.connect()
      .then(() => console.log('Connected to the PostgreSQL db'))
      .catch(err => console.log(err));
    await newClient.query(`INSERT INTO reviews (id, userId, roomId, text, date, accuracy, communication, cleanliness, location, checkIn, value) Values (999999999, 999, 999, 'PLACEHOLDER TEXT TO UPDATE', '2018-08-08', 5, 5, 5, 5, 5, 5)`);
  });
  afterEach(() => {
    newClient.query('DELETE FROM reviews WHERE id = 999999999')
      .then(() => newClient.end())
      .catch(err => console.log(err));
    // newClient.end();
  });
  test('should successfully update a review', (done) => {
    const options = {
      method: 'PUT',
      uri: 'http://127.0.0.1:3003/reviews/999/999999999',
      body: {
        text: 'JEST UPDATED TEXT',
        accuracy: 1,
        communication: 1,
        cleanliness: 1,
        location: 1,
        checkIn: 1,
        value: 1,
      },
      json: true,
    };
    request(options, async (err, response, body) => {
      if (err) {
        console.error(err);
      } else {
        expect(response.statusCode).toBe(200);
        const review = await newClient.query('SELECT * FROM reviews WHERE id = 999999999');
        expect(review.rows[0].text).toBe('JEST UPDATED TEXT');
        expect(review.rows[0].accuracy).toBe(1);
        expect(review.rows[0].communication).toBe(1);
        expect(review.rows[0].cleanliness).toBe(1);
        expect(review.rows[0].location).toBe(1);
        expect(review.rows[0].checkin).toBe(1);
        expect(review.rows[0].value).toBe(1);
        done();
      }
    });
  });
});

describe('Test the "/reviews/:roomId" DELETE route', () => {
  let newClient;
  beforeEach(async () => {
    newClient = new Client(config);
    newClient.connect()
      .then(() => console.log('Connected to the PostgreSQL db'))
      .catch(err => console.log(err));
    await newClient.query(`INSERT INTO reviews (id, userId, roomId, text, date, accuracy, communication, cleanliness, location, checkIn, value) Values (999999999, 999, 999, 'PLACEHOLDER TEXT TO DELETE', '2018-08-08', 5, 5, 5, 5, 5, 5)`);
  });
  afterEach(() => {
    newClient.end();
  });
  test('should successfully delete a review', (done) => {
    const options = {
      method: 'DELETE',
      uri: 'http://127.0.0.1:3003/reviews/999/999999999',
    };
    request(options, async (err, response, body) => {
      if (err) {
        console.error(err);
      } else {
        expect(response.statusCode).toBe(200);
        const review = await newClient.query('SELECT * FROM reviews WHERE id = 999999999');
        expect(review.rows).toHaveLength(0);
        done();
      }
    });
  });
});

describe('Test the error handling of server', () => {
  let newClient;
  beforeEach(() => {
    newClient = new Client(config);
    newClient.connect()
      .then(() => console.log('Connected to the PostgreSQL db'))
      .catch(err => console.log(err));
  });
  afterEach(() => {
    newClient.end();
  });
  test('should respond with statusCode 404 when route not found', (done) => {
    const options = {
      method: 'GET',
      uri: 'http://127.0.0.1:3003/hello',
    };
    request(options, (err, response, body) => {
      if (err) {
        console.error(err);
      } else {
        expect(response.statusCode).toBe(404);
        expect(JSON.parse(body).error).toEqual({message: 'Not found'});
        done();
      }
    });
  });

  test('should respond with statusCode 500 on bad request', (done) => {
    const options = {
      method: 'GET',
      uri: 'http://127.0.0.1:3003/reviews/hello',
    };
    request(options, (err, response, body) => {
      if (err) {
        console.error(err);
      } else {
        expect(response.statusCode).toBe(500);
        done();
      }
    })
  })
});













// xtest('should respond with statusCode 400 on bad request', () => {
//   return request(app)
//     .get('/restaurant/hello/menu')
//     .expect(400, JSON.stringify('Bad request'))
//     .expect('Content-Type', /json/)
//     .catch(err => console.error(err));
// });

// xtest('should respond with statusCode 500 on internal server error', () => {
//   db.retrieve = jest.fn((restaurantId, handleResponse) => {
//     const fakeError = new Error('Error retrieving data from database');
//     handleResponse(fakeError, null);
//   });
//   return request(app)
//     .get('/restaurant/1001/menu')
//     .expect(500, JSON.stringify('Unable to retrieve menu data from database'))
//     .expect('Content-Type', /json/)
//     .catch(err => console.error(err));
// });