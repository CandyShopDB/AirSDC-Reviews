function setJSONBodyPost(requestParams, context, ee, next) {
  const body = {
    userId: 999,
    roomId: 999,
    text: 'Artillery added review: NEED TO DELETE',
    date: '2018-06-29',
    accuracy: 1,
    communication: 1,
    cleanliness: 1,
    location: 1,
    checkIn: 1,
    value: 1,
  };
  requestParams.json = body;
  next();
}

function setJSONBodyPut(requestParams, context, ee, next) {
  const body = {
    text: 'Artillery updated review',
    accuracy: 5,
    communication: 5,
    cleanliness: 5,
    location: 5,
    checkIn: 5,
    value: 5,
  };
  requestParams.json = body;
  next();
}

module.exports = {
  setJSONBodyPost: setJSONBodyPost,
  setJSONBodyPut: setJSONBodyPut,
};
