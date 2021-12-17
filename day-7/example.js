const fs = require('fs');
const text = fs.readFileSync('./day-7/example.txt').toString('utf-8');
const textArrExample = text.split(',').map((el) => parseInt(el));
module.exports = { textArrExample };
