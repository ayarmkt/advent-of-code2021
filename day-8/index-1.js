const { textArrExample } = require('./example');
const { textArr } = require('./input');

const uniqueNum = (str) => {
  return (
    str.length === 2 || str.length === 4 || str.length === 3 || str.length === 7
  );
};

const countNum = (arr) => {
  let count = 0;
  for (const entry of arr) {
    const output = entry[1];
    output.map((str) => {
      if (uniqueNum(str)) {
        count++;
      }
    });
  }
  console.log('count', count);
};

//countNum(textArrExample);
countNum(textArr);
