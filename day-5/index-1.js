const { stringArr, exampleStringArr } = require('./input');

const getMaxRange = (arr, index) => {
  return arr
    .map((row) => Math.max(row[0][index], row[1][index]))
    .reduce((prev, cur) => (prev > cur ? prev : cur), 1);
};

const getOverlappingPoints = (arr) => {
  const horizontalLines = [];
  const verticalLines = [];
  arr.map((line) => {
    if (line[0][0] === line[1][0]) {
      verticalLines.push(line);
    } else if (line[0][1] === line[1][1]) {
      horizontalLines.push(line);
    }
  });

  const maxX = getMaxRange(arr, [0]);
  const maxY = getMaxRange(arr, [1]);

  const matrix = new Array(maxY + 1)
    .fill(0)
    .map(() => new Array(maxX + 1).fill(0));

  //horizontal move (y is the same)
  for (const line of horizontalLines) {
    if (line[0][0] > line[1][0]) {
      for (let i = line[0][0]; i >= line[1][0]; i--) {
        matrix[line[0][1]][i]++;
      }
    } else if (line[0][0] < line[1][0]) {
      for (let i = line[0][0]; i <= line[1][0]; i++) {
        matrix[line[0][1]][i]++;
      }
    }
  }

  //vertical move (x is the same)
  for (const line of verticalLines) {
    if (line[0][1] > line[1][1]) {
      for (let i = line[0][1]; i >= line[1][1]; i--) {
        matrix[i][line[0][0]]++;
      }
    } else if (line[0][1] < line[1][1]) {
      for (let i = line[0][1]; i <= line[1][1]; i++) {
        matrix[i][line[0][0]]++;
      }
    }
  }

  let count = 0;
  for (const row of matrix) {
    for (const cell of row) {
      cell >= 2 && count++;
    }
  }
  console.log('count', count);
};

//getOverlappingPoints(exampleStringArr);
getOverlappingPoints(stringArr);
