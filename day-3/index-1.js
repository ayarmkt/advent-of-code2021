//power consumption = gamma rate * epsilon rate
const { stringArr } = require('./input');

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

const getPowerConsumption = (arr) => {
  const objectByIndex = getNumbersPerIndex(arr);

  let gammaBinary = [];
  let epsilonBinary = [];
  for (let index in objectByIndex) {
    const count = getCounts(objectByIndex[index]);
    gammaBinary.push(count['0'] > count['1'] ? '0' : '1');
    epsilonBinary.push(count['0'] > count['1'] ? '1' : '0');
  }

  const gammaRate = parseInt(gammaBinary.join(''), 2);
  const epsilonRate = parseInt(epsilonBinary.join(''), 2);

  const powerConsumption = gammaRate * epsilonRate;
  console.log(powerConsumption);
  return powerConsumption;
};

getPowerConsumption(stringArr);
