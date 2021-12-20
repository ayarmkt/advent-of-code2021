const { textArr } = require('./input');

//1796 too high

const getLowPoints = (arr) => {
  const rowNum = arr.length;
  const rowLength = arr[0].length;

  let lowPoints = [];

  for (let i = 0; i < rowNum; i++) {
    for (let j = 0; j < rowLength; j++) {
      const curNum = arr[i][j];
      const adjacentNum = [];

      if (i > 0) {
        adjacentNum.push(arr[i - 1][j]);
      }
      if (i < rowNum - 1) {
        adjacentNum.push(arr[i + 1][j]);
      }
      if (j > 0) {
        adjacentNum.push(arr[i][j - 1]);
      }
      if (j < rowLength - 1) {
        adjacentNum.push(arr[i][j + 1]);
      }

      let isNotLowPoint = false;
      adjacentNum.map((num) => {
        if (isNotLowPoint) {
          return;
        } else if (curNum >= num) {
          isNotLowPoint = true;
        } else {
          isNotLowPoint = false;
        }
      });

      if (!isNotLowPoint) {
        lowPoints.push(curNum);
      }
    }
  }

  const answer = lowPoints.reduce((acc, cur) => acc + (cur + 1), 0);
  console.log('answer', answer);
};

getLowPoints(textArr);
