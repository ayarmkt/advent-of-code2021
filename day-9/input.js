const fs = require('fs');
const text = fs.readFileSync('./day-9/input.txt').toString('utf-8');
//const text = fs.readFileSync('./day-9/example.txt').toString('utf-8');
const textArr = text
  .split('\r\n')
  .map((row) => row.split('').map((num) => parseInt(num)));
//console.log(textArr);
module.exports = { textArr };
