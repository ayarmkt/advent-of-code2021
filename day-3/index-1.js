//power consumption = gamma rate * epsilon rate
const { stringArr } = require('./input');

const getArrByIndex = (arr) => {
  let countTotal = {};
  arr.map((num) => {
    const curNum = num.toString();
    for (let i = 0; i < curNum.length; i++) {
      if (countTotal[i]) {
        countTotal[i] += curNum[i];
      } else {
        countTotal[i] = curNum[i];
      }
    }
    return countTotal;
  });
  return countTotal;
};

const getCounts = (str) => {
  let count = { 0: 0, 1: 0 };
  for (let i = 0; i < str.length; i++) {
    str[i] === '1' ? count['1']++ : count['0']++;
  }
  return count;
};

const binaryToNum = (binaryArr) => {
  let sum = 0;
  for (let i = 0; i < binaryArr.length; i++) {
    sum += binaryArr[i] * Math.pow(2, binaryArr.length - i - 1);
  }
  return sum;
};

const getPowerConsumption = (arr) => {
  const countTotal = getArrByIndex(arr);

  let gammaBinary = [];
  let epsilonBinary = [];
  for (let index in countTotal) {
    const count = getCounts(countTotal[index]);
    gammaBinary.push(count['0'] > count['1'] ? '0' : '1');
    epsilonBinary.push(count['0'] > count['1'] ? '1' : '0');
  }

  const gammaRate = binaryToNum(gammaBinary);
  const epsilonRate = binaryToNum(epsilonBinary);

  const powerConsumption = gammaRate * epsilonRate;
  console.log(powerConsumption);
  return powerConsumption;
};

getPowerConsumption(stringArr);
