import { input } from './input.js';
//const input = require('./input');
//const input = require('./input');

//PART 1
const checkForIncrease = (arr) => {
  let countIncreased = 0;
  for (let i = 1; i < arr.length; i++) {
    let cur = arr[i];
    let prev = arr[i - 1];

    if (cur > prev) {
      countIncreased++;
    }
  }
  console.log(countIncreased);
  return countIncreased;
};

checkForIncrease(input);

//PART 2
const checkForSumIncrease = (arr) => {
  let countIncreased = 0;
  for (let i = 3; i < arr.length; i++) {
    let cur = parseInt(arr[i]) + parseInt(arr[i - 1]) + parseInt(arr[i - 2]);
    let prev =
      parseInt(arr[i - 1]) + parseInt(arr[i - 2]) + parseInt(arr[i - 3]);

    if (cur > prev) {
      countIncreased++;
    }
  }
  console.log(countIncreased);
  return countIncreased;
};

checkForSumIncrease(input);
