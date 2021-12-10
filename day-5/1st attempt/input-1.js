const fs = require('fs');
const text = fs.readFileSync('./day-5/input.txt').toString('utf-8');
const exampleText = fs.readFileSync('./day-5/example.txt').toString('utf-8');

const stringArr = text
  .split('\n')
  .map((str) => str.replace('\r', '').split(' -> '))
  .map((arr) => {
    const line = arr.map((str) => str.split(',').map((str) => parseInt(str)));
    return { start: line[0], end: line[1] };
  });
//.map((arr) => console.log(arr)),

const exampleStringArr = exampleText
  .split('\n')
  .map((str) => str.replace('\r', '').split(' -> '))
  .map((arr) => {
    const line = arr.map((str) => str.split(',').map((str) => parseInt(str)));
    return { start: line[0], end: line[1] };
  });

//console.log(stringArr);
module.exports = { stringArr, exampleStringArr };
