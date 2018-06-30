const mongoose = require('mongoose');

const mongoUrl = 'mongodb://localhost/airbnb';

mongoose.connect(mongoUrl);

const roomSchema = new mongoose.Schema({
  roomId: Number,
  roomname: String,
  roomAddress: String,
  hostId: Number,
});

const reviewSchema = new mongoose.Schema({
  userId: Number,
  username: String,
  avatar: String,
  roomId: Number,
  text: String,
  date: Date,
  accuracy: Number,
  communication: Number,
  cleanliness: Number,
  location: Number,
  checkIn: Number,
  value: Number,
  photoUrls: String,
});

const RoomModel = mongoose.model('rooms', roomSchema);
const ReviewModel = mongoose.model('reviews', reviewSchema);