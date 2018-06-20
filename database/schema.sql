DROP DATABASE IF EXISTS nappbnbreviews;

CREATE DATABASE nappbnbreviews;

USE nappbnbreviews;

DROP TABLE IF EXISTS reviews;
		
CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT,
  userId INT NOT NULL,
  roomId INT NOT NULL,
  text VARCHAR(1000) NULL,
  date DATE NOT NULL,
  accuracy DECIMAL(10,8),
  communication DECIMAL(10,8),
  cleanliness DECIMAL(10,8),
  location DECIMAL(10,8),
  checkIn DECIMAL(10,8),
  value DECIMAL(10,8),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS users;
		
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  userName VARCHAR(100),
  avatar VARCHAR(100),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS rooms;
		
CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT,
  roomName VARCHAR(100),
  totalNumberReviews INT NOT NULL,
  accuracy DECIMAL(10,8) NOT NULL,
  communication DECIMAL(10,8) NOT NULL,
  cleanliness DECIMAL(10,8) NOT NULL,
  location DECIMAL(10,8) NOT NULL,
  checkIn DECIMAL(10,8) NOT NULL,
  value DECIMAL(10,8) NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE reviews ADD FOREIGN KEY (userId) REFERENCES users (id);
ALTER TABLE reviews ADD FOREIGN KEY (roomId) REFERENCES rooms (id);