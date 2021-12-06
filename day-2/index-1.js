const { stringArr } = require('./input');

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
