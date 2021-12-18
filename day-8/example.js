const fs = require('fs');
const text = fs.readFileSync('./day-8/example.txt').toString('utf-8');
const textArrExample = text
  .split('\r\n')
  .map((str) => str.split(' | ').map((str) => str.split(' ')));
//console.log(textArrExample);
module.exports = { textArrExample };
