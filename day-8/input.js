const fs = require('fs');
const text = fs.readFileSync('./day-8/input.txt').toString('utf-8');
const textArr = text
  .split('\r\n')
  .map((str) => str.split(' | ').map((str) => str.split(' ')));
//console.log(textArr);
module.exports = { textArr };
