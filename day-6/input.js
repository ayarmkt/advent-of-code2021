const fs = require('fs');
const text = fs.readFileSync('./day-6/input.txt').toString('utf-8');
const [textArr] = text
  .split('\n')
  .map((str) => str.split(','))
  .map((arr) =>
    arr.map((str) => {
      return { number: parseInt(str), amount: 1 };
    })
  );
//console.log(text);
//console.log(textArr);
module.exports = { textArr };
