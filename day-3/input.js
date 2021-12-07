const fs = require('fs');
const text = fs.readFileSync('./day-3/input.txt').toString('utf-8');
const stringArr = text.split('\n').map((num) => num.replace('\r', ''));
module.exports = { stringArr };
