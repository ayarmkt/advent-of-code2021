const { textArr } = require('./input');
const { textArrExample } = require('./example');

const calculate = (arr, days) => {
  //check for each day
  for (let i = 0; i < days; i++) {
    let add = 0;
    for (const numberObj of arr) {
      if (numberObj.number === 0) {
        add += numberObj.amount;
        numberObj.number = 6;
      } else {
        numberObj.number -= 1;
      }
    }

    if (add) {
      arr.push({ number: 8, amount: add });
    }
  }

  const answer = arr.reduce((acc, cur) => acc + cur.amount, 0);
  console.log(answer);
};

//calculate(textArrExample, 256);
//26984457539

calculate(textArr, 256);
//1592778185024
