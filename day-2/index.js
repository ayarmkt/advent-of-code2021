const { stringArr } = require('./input');
//import { stringArr } from './input.js';
console.log(stringArr);

//const sample = ['forward 4', 'up 9', 'forward 2', 'forward 2', 'down 7'];

const getPosition = (arr) => {
  let position = { horizontalPosition: 0, depth: 0 };

  arr.map((action) => {
    let move = parseInt(action.split(' ')[1]);
    if (action.includes('forward')) {
      position.horizontalPosition += move;
    } else if (action.includes('down')) {
      position.depth += move;
    } else {
      position.depth -= move;
    }
  });

  const answer = position['horizontalPosition'] * position['depth'];
  console.log(answer);
  return answer;
};

getPosition(stringArr);
