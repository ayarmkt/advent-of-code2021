const fs = require('fs');
const text = fs.readFileSync('./day-2/input.txt').toString('utf-8');
const stringArr = text.split('\n');
module.exports = { stringArr };
