const roomTransform = function(doc) {
  doc.type = 'room';
  doc.roomId = parseInt(doc.roomId);
  doc.hostId = parseInt(doc.hostId);
  return doc;
}

module.exports = roomTransform;
