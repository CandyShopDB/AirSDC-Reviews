const faker = require('faker');
const fs = require('fs');
const path = require('path');

const generateRandomInt = (min, max) => (
  Math.ceil((Math.random() * (max - min)) + min)
);

const roomTotal = 5000000;

// Populate rooms table CSV file
const generateRoomsTable = () => {
  const roomsFile = fs.createWriteStream(path.join(__dirname, './dataPostgres/rooms.csv'));
  roomsFile.write('roomname,room_address,hostId,totalNumReviews,totalAccuracy,totalCommunication,totalCleanliness,totalLocation,totalCheckIn,totalValue\r\n');
  let i = 0;
  const writeToRooms = () => {
    let isWriteable = true;
    do {
      i++;
      let storageStr = '';
      if (i === 1250000) {
        console.log('Quarter of the way there!');
      } else if (i === 2500000) {
        console.log('Halfway there!');
      } else if (i === 3750000) {
        console.log('3 Quarter there!');
      }
      const roomname = `Private ${generateRandomInt(1, 5)} Bedroom ${faker.commerce.productAdjective()} House Available!`;
      const roomAddress = `${faker.address.streetAddress(true)}. ${faker.address.city()}. ${faker.address.stateAbbr()} ${faker.address.zipCode()}`;
      const hostId = generateRandomInt(1, roomTotal * 3);
      const totalNumReviews = generateRandomInt(8, 12);
      const totalAccuracy = generateRandomInt(1, 5);
      const totalCommunication = generateRandomInt(1, 5);
      const totalCleanliness = generateRandomInt(1, 5);
      const totalLocation = generateRandomInt(1, 5);
      const totalCheckIn = generateRandomInt(1, 5);
      const totalValue = generateRandomInt(1, 5);
      storageStr += `${roomname},${roomAddress},${hostId},${totalNumReviews},${totalAccuracy},${totalCommunication},${totalCleanliness},${totalLocation},${totalCheckIn},${totalValue}\r\n`;
      if (i === roomTotal) {
        roomsFile.write(storageStr);
        console.timeEnd(`${roomTotal}_rooms`);
      } else {
        isWriteable = roomsFile.write(storageStr);
      }
    } while (i < roomTotal && isWriteable);
    if (i < roomTotal) {
      roomsFile.once('drain', writeToRooms);
    }
  }
  writeToRooms();
};
// console.time(`${roomTotal}_rooms`);
// generateRoomsTable();

// Populate reviews table CSV file
const generateReviewsTable = () => {
  const monthOptions = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const reviewsFile = fs.createWriteStream(path.join(__dirname, './dataPostgres/reviews.csv'));
  reviewsFile.write('userId,roomId,text,date,accuracy,communication,cleanliness,location,checkIn,value\r\n');
  let i = 0;
  const writeToReviews = () => {
    let isWriteable = true;
    do {
      i++;
      let storageStr = '';
      if (i === 2500000) {
        console.log('Quarter of the way there!');
      } else if (i === 5000000) {
        console.log('Halfway there!');
      } else if (i === 7500000) {
        console.log('3 Quarter there!');
      }
      for (let j = 0; j < generateRandomInt(8, 12); j++) {
        const userId = generateRandomInt(1, roomTotal * 3);
        const roomId = i;
        const text = faker.lorem.paragraph();
        const date = `${generateRandomInt(2008, 2018)}-${monthOptions[generateRandomInt(0, 11)]}-${generateRandomInt(1, 28)}`;
        const accuracy = generateRandomInt(1, 5);
        const communication = generateRandomInt(1, 5);
        const cleanliness = generateRandomInt(1, 5);
        const location = generateRandomInt(1, 5);
        const checkIn = generateRandomInt(1, 5);
        const value = generateRandomInt(1, 5);
        storageStr += `${userId},${roomId},${text},${date},${accuracy},${communication},${cleanliness},${location},${checkIn},${value}\r\n`;
      }
      if (i === roomTotal) {
        reviewsFile.write(storageStr);
        console.timeEnd(`${roomTotal * 10}_reviews`);
      } else {
        isWriteable = reviewsFile.write(storageStr);
      }
    } while (i < roomTotal && isWriteable);
    if (i < roomTotal) {
      reviewsFile.once('drain', writeToReviews);
    }
  }
  writeToReviews();
}

// console.time(`${roomTotal * 10}_reviews`);
// generateReviewsTable();

// Populate users table CSV file
const generateUsersTable = () => {
  const usersFile = fs.createWriteStream(path.join(__dirname, './dataPostgres/users.csv'));
  usersFile.write('username,avatar\r\n');
  let i = 0;
  const writeToUsers = () => {
    let isWriteable = true;
    do {
      i++;
      let storageStr = '';
      for (let j = 0; j < 3; j++) {
        const username = faker.name.findName();
        const avatar = faker.image.avatar();
        storageStr += `${username},${avatar}\r\n`;
      }
      if (i === roomTotal * 3) {
        usersFile.write(storageStr);
        console.timeEnd(`${roomTotal * 3}_users`);
      } else {
        isWriteable = usersFile.write(storageStr);
      }
    } while (i < roomTotal * 3 && isWriteable);
    if (i < roomTotal * 3) {
      usersFile.once('drain', writeToUsers);
    }
  }
  writeToUsers();
}
console.time(`${roomTotal * 3}_users`);
generateUsersTable();

// Populate photos table CSV file
// const generatePhotosTable = () => {
//   const photoOuterLoopNum = roomTotal / 100;
//   const photosFile = fs.createWriteStream(path.join(__dirname, './dataPostgres/photos.csv'));
//   photosFile.write('reviewId,photoUrl\r\n');
//   for (let i = 0; i < photoOuterLoopNum; i++) {
//     let storageStr = '';
//     for (let j = 0; j < 100; j++) {
//       for (let k = 0; k < generateRandomInt(0, 4); k++) {
//         const reviewId = generateRandomInt(1, roomTotal);
//         const photoUrl = `https://s3-us-west-1.amazonaws.com/fec-photos/photo${generateRandomInt(1001, 1315)}.jpeg`;
//         storageStr += `${reviewId},${photoUrl}\r\n`;
//       }
//     }
//     photosFile.write(storageStr);
//   }
// }
// console.time(`${roomTotal * 2}_photos`);
// generatePhotosTable();
// console.timeEnd(`${roomTotal * 2}_photos`);

// Populate reports table CSV file
// const generateReportsTable = () => {
//   const reportOuterLoopNum = roomTotal / 100;
//   const reportsFile = fs.createWriteStream(path.join(__dirname, './dataPostgres/reports.csv'));
//   reportsFile.write('reviewId,reporterId,reason,comments\r\n');
//   for (let i = 0; i < reportOuterLoopNum; i++) {
//     let storageStr = '';
//     for (let j = 0; j < 100 / 2; j++) {
//       const reviewId = generateRandomInt(1, roomTotal * 10);
//       const reporterId = generateRandomInt(1, roomTotal * 3);
//       const reason = generateRandomInt(1, 3);
//       const comments = faker.lorem.paragraph();
//       storageStr += `${reviewId},${reporterId},${reason},${comments}\r\n`;
//     }
//     reportsFile.write(storageStr);
//   }
// }
// console.time(`${roomTotal * 0.5}_reports`);
// generateReportsTable();
// console.timeEnd(`${roomTotal * 0.5}_reports`);

