const faker = require('faker');
const fs = require('fs');
const path = require('path');

const generateRandomInt = (min, max) => (
  Math.ceil((Math.random() * (max - min)) + min)
);

const roomTotal = 10000000;

// Generate Rooms Documents
const generateRoomsTable = () => {
  const roomsFile = fs.createWriteStream(path.join(__dirname, './dataCouch/rooms.csv'));
  roomsFile.write('roomId,roomname,room_address,hostId,totalNumReviews,totalAccuracy,totalCommunication,totalCleanliness,totalLocation,totalCheckIn,totalValue\r\n');
  let i = 0;
  const writeToRooms = () => {
    let isWriteable = true;
    do {
      i++;
      const roomId = i;
      const roomname = `Private ${generateRandomInt(1, 5)} Bedroom ${faker.commerce.productAdjective()} House Available!`;
      const roomAddress = `${faker.address.streetAddress(true)}. ${faker.address.city()}. ${faker.address.stateAbbr()} ${faker.address.zipCode()}`;
      const hostId = generateRandomInt(1, roomTotal * 3);
      if (i === roomTotal) {
        roomsFile.write(`${roomId},${roomname},${roomAddress},${hostId},,,,,,,\r\n`);
        console.timeEnd(`${roomTotal}_rooms`);
      } else {
        isWriteable = roomsFile.write(`${roomId},${roomname},${roomAddress},${hostId},,,,,,,\r\n`);
      }
    } while (i < roomTotal && isWriteable);
    if (i < roomTotal) {
      roomsFile.once('drain', writeToRooms);
    }
  }
  writeToRooms();
}

console.time(`${roomTotal}_rooms`);
generateRoomsTable();



const generateReviewsTable = () => {
  const monthOptions = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const reviewsFile = fs.createWriteStream(path.join(__dirname, './dataCouch/reviews.csv'));
  reviewsFile.write('userId,username,avatar,roomId,text,date,accuracy,communication,cleanliness,location,checkIn,value,photoUrls,reporterId,reason,comments\r\n');
  let i = 0;
  const writeToReviews = () => {
    let isWriteable = true;
    do {
      i++;
      let storageStr = '';
      for (let j = 0; j < generateRandomInt(8, 12); j++) {
        const userId = generateRandomInt(1, roomTotal * 3);
        const username = faker.name.findName();
        const avatar = faker.image.avatar();
        const roomId = i;
        const text = faker.lorem.paragraph();
        const date = `${generateRandomInt(2008, 2018)}-${monthOptions[generateRandomInt(0, 11)]}-${generateRandomInt(1, 30)}`;
        const accuracy = generateRandomInt(1, 5);
        const communication = generateRandomInt(1, 5);
        const cleanliness = generateRandomInt(1, 5);
        const location = generateRandomInt(1, 5);
        const checkIn = generateRandomInt(1, 5);
        const value = generateRandomInt(1, 5);
        let photoUrls = '';
        for (let h = 0; h < generateRandomInt(0, 4); h++) {
          photoUrls += `https://s3-us-west-1.amazonaws.com/fec-photos/photo${generateRandomInt(1001, 1315)}.jpeg|`;
        }
        let reporterId = null;
        let reason = null;
        let comments = null;
        for (let m = 0; m < generateRandomInt(0, 1); m++) {
          reporterId = generateRandomInt(1, roomTotal * 3);
          reason = generateRandomInt(1, 3);
          comments = faker.lorem.paragraph();
        }
        storageStr += `${userId},${username},${avatar},${roomId},${text},${date},${accuracy},${communication},${cleanliness},${location},${checkIn},${value},${photoUrls},${reporterId},${reason},${comments}\r\n`;
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

console.time(`${roomTotal * 10}_reviews`);
generateReviewsTable();


// console.time(`${roomTotal}_rooms`);
// let roomCounter = 0;
// const roomOuterLoopNum = roomTotal / 100;
// for (let i = 0; i < roomOuterLoopNum; i++) {
//   if (i === roomOuterLoopNum * 0.25) {
//     console.log('1 Quarter there!');
//   } else if (i === roomOuterLoopNum * 0.5) {
//     console.log('Halfway there!');
//   } else if (i === roomOuterLoopNum * 0.75) {
//     console.log('3 Quarter there!');
//   }
//   let storageStr = '';
//   for (let j = 0; j < 100; j++) {
//     const roomId = i;
//     const roomname = `Private ${generateRandomInt(1, 5)} Bedroom ${faker.commerce.productAdjective()} House Available!`;
//     const roomAddress = `${faker.address.streetAddress(true)}. ${faker.address.city()}. ${faker.address.stateAbbr()} ${faker.address.zipCode()}`;
//     const hostId = generateRandomInt(1, roomTotal * 3);
//     storageStr += `${roomId},${roomname},${roomAddress},${hostId},,,,,,,\r\n`;
//     roomCounter += 1;
//   }
//   roomsFile.write(storageStr);
// }
// console.timeEnd(`${roomTotal}_rooms`);

// const monthOptions = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

// // Generate Reviews Documents
// console.time(`${roomTotal * 10}_reviews`);
// const reviewsFile = fs.createWriteStream(path.join(__dirname, './dataCouch/reviews.csv'));
// reviewsFile.write('userId,username,avatar,roomId,text,date,accuracy,communication,cleanliness,location,checkIn,value,photoUrls,reporterId,reason,comments\r\n');
// let counter = 1;
// const outerLoopNum = roomTotal;
// for (let i = 0; i < outerLoopNum; i++) {
//   if (i === outerLoopNum * 0.25) {
//     console.log('1 Quarter there!');
//   } else if (i === outerLoopNum * 0.5) {
//     console.log('Halfway there!');
//   } else if (i === outerLoopNum * 0.75) {
//     console.log('3 Quarter there!');
//   }
//   let storageStr = '';
//   for (let j = 0; j < 1; j++) {
//     for (let k = 0; k < generateRandomInt(8, 12); k++) {
//       const userId = generateRandomInt(1, roomTotal * 3);
//       const username = faker.name.findName();
//       const avatar = faker.image.avatar();
//       const roomId = counter;
//       const text = faker.lorem.paragraph();
//       const date = `${generateRandomInt(2008, 2018)}-${monthOptions[generateRandomInt(0, 11)]}-${generateRandomInt(1, 30)}`;
//       const accuracy = generateRandomInt(1, 5);
//       const communication = generateRandomInt(1, 5);
//       const cleanliness = generateRandomInt(1, 5);
//       const location = generateRandomInt(1, 5);
//       const checkIn = generateRandomInt(1, 5);
//       const value = generateRandomInt(1, 5);
//       let photoUrls = '';
//       for (let h = 0; h < generateRandomInt(0, 4); h++) {
//         photoUrls += `https://s3-us-west-1.amazonaws.com/fec-photos/photo${generateRandomInt(1001, 1315)}.jpeg|`;
//       }
//       let reporterId = null;
//       let reason = null;
//       let comments = null;
//       for (let m = 0; m < generateRandomInt(0, 1); m++) {
//         reporterId = generateRandomInt(1, roomTotal * 3);
//         reason = generateRandomInt(1, 3);
//         comments = faker.lorem.paragraph();
//       }
//       storageStr += `${userId},${username},${avatar},${roomId},${text},${date},${accuracy},${communication},${cleanliness},${location},${checkIn},${value},${photoUrls},${reporterId},${reason},${comments}\r\n`;
//     }
//     counter += 1;
//   }
//   reviewsFile.write(storageStr);
// }
// console.timeEnd(`${roomTotal * 10}_reviews`);