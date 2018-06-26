const reviewTransform = function(doc) {
  doc.type = 'review';
  doc.user = {
    userId: parseInt(doc.userId),
    username: doc.username,
    avatar: doc.avatar,
  };
  const photoUrls = doc.photoUrls.split('|');
  photoUrls.splice(-1, 1);
  doc.photos = photoUrls.map(function(url) {
    return {
      url: url,
    };
  });
  doc.reports = [];
  if (doc.reporterId !== null) {
    const reportObj = {
      reporterId: parseInt(doc.reporterId),
      reason: parseInt(doc.reason),
      comments: doc.comments,
    };
    doc.reports.push(reportObj);
  }
  doc.roomId = parseInt(doc.roomId);
  doc.accuracy = parseInt(doc.accuracy);
  doc.communication = parseInt(doc.communication);
  doc.cleanliness = parseInt(doc.cleanliness);
  doc.location = parseInt(doc.location);
  doc.checkIn = parseInt(doc.checkIn);
  doc.value = parseInt(doc.value);
  delete doc.userId;
  delete doc.username;
  delete doc.avatar;
  delete doc.photoUrls;
  delete doc.reporterId;
  delete doc.reason;
  delete doc.comments;
  return doc;
}

module.exports = reviewTransform;
