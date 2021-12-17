const fs = require('fs');
const text = fs.readFileSync('./day-7/input.txt').toString('utf-8');
const textArr = text.split(',').map((el) => parseInt(el));
module.exports = { textArr };
