const { stringArr } = require('./input');

const getPosition = (arr) => {
  let position = { horizontalPosition: 0, depth: 0, aim: 0 };

  arr.map((action) => {
    let move = parseInt(action.split(' ')[1]);
    if (action.includes('forward')) {
      position.horizontalPosition += move;
      position.depth += position.aim * move;
    } else if (action.includes('down')) {
      position.aim += move;
    } else {
      position.aim -= move;
    }
  });

  const answer = position['horizontalPosition'] * position['depth'];
  console.log(answer);
  return answer;
};

getPosition(stringArr);
