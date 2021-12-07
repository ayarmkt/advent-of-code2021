//life support rating = oxygen generator rating * CO2 scrubber rating
//oxygen generator rating => determine the most common value (0 or 1) in the current bit position. If 0 and 1 are equally common, keep values with a 1 in the position being considered.
//CO2 scrubber rating => determine the least common value (0 or 1) in the current bit position. If 0 and 1 are equally common, keep values with a 0 in the position being considered.
//use reduce for getting each rating?
//keep the ones by bit criteria, stop when one num left

//10111 23
//01010 10

const { stringArr } = require('./input');

// const sample = [
//   '00100',
//   '11110',
//   '10110',
//   '10111',
//   '10101',
//   '01111',
//   '00111',
//   '11100',
//   '10000',
//   '11001',
//   '00010',
//   '01010',
// ];

const getNumbersPerIndex = (arr) => {
  let objectByIndex = {};
  arr.map((num) => {
    const curNum = num.toString();
    for (let i = 0; i < curNum.length; i++) {
      if (objectByIndex[i]) {
        objectByIndex[i] = [...objectByIndex[i], curNum[i]];
      } else {
        objectByIndex[i] = [curNum[i]];
      }
    }
    return objectByIndex;
  });
  return objectByIndex;
};

const getCounts = (str) => {
  let count = { 0: 0, 1: 0 };
  for (let i = 0; i < str.length; i++) {
    str[i] === '1' ? count['1']++ : count['0']++;
  }
  return count;
};

const narrowDownBinary = (arr, name) => {
  let startingArr = arr;

  for (let i = 0; i < arr.length; i++) {
    if (startingArr.length === 1) return startingArr;

    const getNumberByIndex = getNumbersPerIndex(startingArr)[i];
    const getCountsByIndex = getCounts(getNumberByIndex);

    let condition;
    if (name === 'oxygen') {
      condition = getCountsByIndex['0'] > getCountsByIndex['1'] ? '0' : '1';
    } else if (name === 'CO2') {
      condition = getCountsByIndex['0'] > getCountsByIndex['1'] ? '1' : '0';
    }

    const filterByIndex = startingArr.filter((num) => num[i] === condition);
    startingArr = filterByIndex;
  }
  return startingArr;
};

const getLifeSupportRating = (arr) => {
  const oxygenBinary = narrowDownBinary(arr, 'oxygen');
  const CO2Binary = narrowDownBinary(arr, 'CO2');

  const oxygenRating = parseInt(oxygenBinary, 2);
  const CO2Rating = parseInt(CO2Binary, 2);

  const lifeSupportRating = oxygenRating * CO2Rating;
  console.log('lifeSupportRating', lifeSupportRating);
  return lifeSupportRating;
};

getLifeSupportRating(stringArr);
//getLifeSupportRating(sample);
