// const fs = require('fs');
// const text = fs.readFileSync('./day-6/example.txt').toString('utf-8');
// module.exports = { text };

const fs = require('fs');
const text = fs.readFileSync('./day-6/example.txt').toString('utf-8');
const [textArrExample] = text
  .split('\n')
  .map((str) => str.split(','))
  .map((arr) =>
    arr.map((str) => {
      return { number: parseInt(str), amount: 1 };
    })
  );
//console.log(text);
//console.log(textArrExample);
module.exports = { textArrExample };
