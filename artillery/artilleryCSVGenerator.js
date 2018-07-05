const fs = require('fs');
const path = require('path');

const generateRandomInt = (min, max) => (
  Math.ceil((Math.random() * (max - min)) + min)
);

const roomTotal = 5000000;

const generateArtilleryFodder = (lines, startRange, endRange, percent) => {
  const fodderFile = fs.createWriteStream(path.join(__dirname, `./fodder${percent}.csv`));
  fodderFile.write('roomUrl,reviewId\r\n');
  let i = 0;
  const writeToFodder = () => {
    let isWriteable = true;
    do {
      i++;
      let storageStr = '';
      if (i === roomTotal / 4) {
        console.log('Quarter of the way there!');
      } else if (i === roomTotal / 2) {
        console.log('Halfway there!');
      } else if (i === roomTotal / 4 * 3) {
        console.log('3 Quarters there!');
      }
      const roomUrl = `/reviews/${generateRandomInt(startRange, endRange)}`;
      const reviewId = `${generateRandomInt(1, 50000000)}`;
      storageStr += `${roomUrl},${reviewId}\r\n`;
      if (i === lines) {
        fodderFile.write(storageStr);
      } else {
        isWriteable = fodderFile.write(storageStr);
      }
    } while (i < lines && isWriteable);
    if (i < lines) {
      fodderFile.once('drain', writeToFodder);
    }
  }
  writeToFodder();
};

generateArtilleryFodder(400000, 4000001, 5000000, 20);

generateArtilleryFodder(100000, 1, 4000000, 80);
