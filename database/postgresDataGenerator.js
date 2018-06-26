const faker = require('faker');
const fs = require('fs');
const path = require('path');

const generateRandomInt = (min, max) => (
  Math.ceil((Math.random() * (max - min)) + min)
);

const roomTotal = 10000000;

// Populate rooms table CSV file
const generateRoomsTable = () => {
  const roomOuterLoopNum = roomTotal / 100;
  const roomsFile = fs.createWriteStream(path.join(__dirname, './dataPostgres/rooms.csv'));
  roomsFile.write('roomname,room_address,hostId,totalNumReviews,totalAccuracy,totalCommunication,totalCleanliness,totalLocation,totalCheckIn,totalValue\r\n');
  for (let i = 0; i < roomOuterLoopNum; i++) {
    let storageStr = '';
    for (let j = 0; j < 100; j++) {
      const roomname = `Private ${generateRandomInt(1, 5)} Bedroom ${faker.commerce.productAdjective()} House Available!`;
      const roomAddress = `${faker.address.streetAddress(true)}. ${faker.address.city()}. ${faker.address.stateAbbr()} ${faker.address.zipCode()}`;
      const hostId = generateRandomInt(1, roomTotal * 3);
      storageStr += `${roomname},${roomAddress},${hostId},,,,,,,\r\n`;
    }
    roomsFile.write(storageStr);
  }
};
console.time(`${roomTotal}_rooms`);
generateRoomsTable();
console.timeEnd(`${roomTotal}_rooms`);

// Populate reviews table CSV file
const generateReviewsTable = () => {
  const reviewOuterLoopNum = roomTotal / 5;
  const reviewsFile = fs.createWriteStream(path.join(__dirname, './dataPostgres/reviews.csv'));
  reviewsFile.write('userId,roomId,text,date,accuracy,communication,cleanliness,location,checkIn,value\r\n');
  let counter = 1;
  for (let i = 0; i < reviewOuterLoopNum; i++) {
    let storageStr = '';
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < generateRandomInt(8, 12); k++) {
        const userId = generateRandomInt(1, roomTotal * 3);
        const roomId = counter;
        const text = faker.lorem.paragraph();
        const date = `${faker.date.month()} ${generateRandomInt(2008, 2018)}`;
        const accuracy = generateRandomInt(1, 5);
        const communication = generateRandomInt(1, 5);
        const cleanliness = generateRandomInt(1, 5);
        const location = generateRandomInt(1, 5);
        const checkIn = generateRandomInt(1, 5);
        const value = generateRandomInt(1, 5);
        storageStr += `${userId},${roomId},${text},${date},${accuracy},${communication},${cleanliness},${location},${checkIn},${value}\r\n`;
      }
      counter += 1;
    }
    reviewsFile.write(storageStr);
  }
}
console.time(`${roomTotal * 10}_reviews`);
generateReviewsTable();
console.timeEnd(`${roomTotal * 10}_reviews`);

// Populate users table CSV file
const generateUsersTable = () => {
  const userOuterLoopNum = roomTotal / 100;
  const usersFile = fs.createWriteStream(path.join(__dirname, './dataPostgres/users.csv'));
  usersFile.write('username,avatar\r\n');
  for (let i = 0; i < userOuterLoopNum * 3; i++) {
    let storageStr = '';
    for (let j = 0; j < 100; j++) {
      const username = faker.name.findName();
      const avatar = faker.image.avatar();
      storageStr += `${username},${avatar}\r\n`;
    }
    usersFile.write(storageStr);
  }
}
console.time(`${roomTotal * 3}_users`);
generateUsersTable();
console.timeEnd(`${roomTotal * 3}_users`);

// Populate photos table CSV file
const generatePhotosTable = () => {
  const photoOuterLoopNum = roomTotal / 100;
  const photosFile = fs.createWriteStream(path.join(__dirname, './dataPostgres/photos.csv'));
  photosFile.write('reviewId,photoUrl\r\n');
  for (let i = 0; i < photoOuterLoopNum; i++) {
    let storageStr = '';
    for (let j = 0; j < 100; j++) {
      for (let k = 0; k < generateRandomInt(0, 4); k++) {
        const reviewId = generateRandomInt(1, roomTotal);
        const photoUrl = `https://s3-us-west-1.amazonaws.com/fec-photos/photo${generateRandomInt(1001, 1315)}.jpeg`;
        storageStr += `${reviewId},${photoUrl}\r\n`;
      }
    }
    photosFile.write(storageStr);
  }
}
console.time(`${roomTotal * 2}_photos`);
generatePhotosTable();
console.timeEnd(`${roomTotal * 2}_photos`);

// Populate reports table CSV file
const generateReportsTable = () => {
  const reportOuterLoopNum = roomTotal / 100;
  const reportsFile = fs.createWriteStream(path.join(__dirname, './dataPostgres/reports.csv'));
  reportsFile.write('reviewId,reporterId,reason,comments\r\n');
  for (let i = 0; i < reportOuterLoopNum; i++) {
    let storageStr = '';
    for (let j = 0; j < 100 / 2; j++) {
      const reviewId = generateRandomInt(1, roomTotal * 10);
      const reporterId = generateRandomInt(1, roomTotal * 3);
      const reason = generateRandomInt(1, 3);
      const comments = faker.lorem.paragraph();
      storageStr += `${reviewId},${reporterId},${reason},${comments}\r\n`;
    }
    reportsFile.write(storageStr);
  }
}
console.time(`${roomTotal * 0.5}_reports`);
generateReportsTable();
console.timeEnd(`${roomTotal * 0.5}_reports`);

