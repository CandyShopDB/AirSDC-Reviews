const fs = require('fs');

const words = fs.readFileSync('/usr/share/dict/words', 'utf-8').split('\n');

const generateCharArray = (letterA, letterB, includeUpperCase = true, specialCharArray) => {
  const charCodeA = letterA.toLowerCase().charCodeAt(0);
  const charCodeB = letterB.toLowerCase().charCodeAt(0);

  let generatedArray = [];
  for (let i = Math.min(charCodeA, charCodeB); i < Math.max(charCodeA, charCodeB); i++) {
    generatedArray.push(String.fromCharCode(i));
    if (includeUpperCase) { generatedArray.push(String.fromCharCode(i).toUpperCase()); }
  }
  if (specialCharArray) { generatedArray = generatedArray.concat(specialCharArray); }
  generatedArray.sort();
  return generatedArray;
};

const generateInteger = (max = 1, min = 0) => Math.floor(Math.random() * ((max + 1) - min)) + min;

const generateString = (lengthOfString, maxLength = 5, minLength = 3, options = generateCharArray('a', 'z', true, ['-'])) => {
  const length = lengthOfString || generateInteger(maxLength, minLength);

  let generatedString = '';
  for (let i = 0; i < length; i++) {
    generatedString += options[generateInteger(options.length - 1)];
  }

  return generatedString;
};

const generateWords = (numWords, maxLength = 500, maxNumWords = 3, minNumWords = 1) => {
  const numberOfWords = numWords || generateInteger(maxNumWords, minNumWords);

  const generatedWords = [];
  for (let i = 0; i < numberOfWords; i++) {
    generatedWords[i] = words[generateInteger(words.length - 1)];
  }

  return generatedWords.join(' ').slice(0, maxLength);
};

const generateDateString = (maxDate = '2020-12-31', minDate = '1990-1-1') => {
  const startTime = new Date(minDate).getTime();
  const endTime = new Date(maxDate).getTime();
  const randomDate = new Date(generateInteger(endTime, startTime));
  return [randomDate.getFullYear(), randomDate.getMonth() + 1, randomDate.getDate()].join('-');
};

module.exports = {
  generateCharArray,
  generateInteger,
  generateString,
  generateWords,
  generateDateString,
};
