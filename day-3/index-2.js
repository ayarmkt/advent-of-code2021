//life support rating = oxygen generator rating * CO2 scrubber rating
//4138664
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

const getPowerConsumption = (arr) => {
  const countTotal = getArrByIndex(arr);

  let gammaBinary = [];
  let epsilonBinary = [];
  for (let index in countTotal) {
    const count = getCounts(countTotal[index]);
    gammaBinary.push(count['0'] > count['1'] ? '0' : '1');
    epsilonBinary.push(count['0'] > count['1'] ? '1' : '0');
  }

  const gammaRate = parseInt(gammaBinary);
  const epsilonRate = parseInt(epsilonBinary);

  const powerConsumption = gammaRate * epsilonRate;
  console.log(powerConsumption);
  return powerConsumption;
};

getPowerConsumption(stringArr);
