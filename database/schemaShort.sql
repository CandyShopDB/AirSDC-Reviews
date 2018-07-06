DROP TABLE IF EXISTS reviews CASCADE;
		
CREATE TABLE reviews (
  id SERIAL,
  userId INT NOT NULL,
  roomId INT NOT NULL,
  text VARCHAR(1000) NULL,
  date DATE NOT NULL,
  accuracy INT NOT NULL,
  communication INT NOT NULL,
  cleanliness INT NOT NULL,
  location INT NOT NULL,
  checkIn INT NOT NULL,
  value INT NOT NULL,
  PRIMARY KEY (id)
);

-- DROP TABLE IF EXISTS users CASCADE;
		
-- CREATE TABLE users (
--   id SERIAL,
--   username VARCHAR(100),
--   avatar VARCHAR(100),
--   PRIMARY KEY (id)
-- );

-- DROP TABLE IF EXISTS rooms CASCADE;
		
-- CREATE TABLE rooms (
--   id SERIAL,
--   roomname VARCHAR(300),
--   roomAddress VARCHAR(200),
--   hostId INT NOT NULL,
--   totalNumReviews INT,
--   totalAccuracy DECIMAL(10,5),
--   totalCommunication DECIMAL(10,5),
--   totalCleanliness DECIMAL(10,5),
--   totalLocation DECIMAL(10,5),
--   totalCheckIn DECIMAL(10,5),
--   totalValue DECIMAL(10,5),
--   PRIMARY KEY (id)
-- );
