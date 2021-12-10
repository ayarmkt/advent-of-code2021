const { stringArr, exampleStringArr } = require('./input-1');

const isVertical = (line) => {
  return line['start'][0] === line['end'][0];
};

const isHorizontal = (line) => {
  return line['start'][1] === line['end'][1];
};

const isDiagonal = (line) => {
  return (
    Math.abs(line['start'][0] - line['end'][0]) ===
    Math.abs(line['start'][1] - line['end'][1])
  );
};

const returnVerticalModel = (line) => {
  return {
    x: line['start'][0],
    y: {
      min: Math.min(line['start'][1], line['end'][1]),
      max: Math.max(line['start'][1], line['end'][1]),
    },
  };
};

const returnHorizontalModel = (line) => {
  return {
    x: {
      min: Math.min(line['start'][0], line['end'][0]),
      max: Math.max(line['start'][0], line['end'][0]),
    },
    y: line['start'][1],
  };
};

const returnDiagonalModel = (line) => {
  // { start: [ 6, 4 ], end: [ 2, 0 ] },
  //[6, 4], [5, 3], [4, 2], [3, 1], [2, 0]
  return {
    x: {
      start: line['start'][0],
      end: line['end'][0],
      direction: line['start'][0] - line['end'][0],
    },
    y: {
      start: line['start'][1],
      end: line['end'][1],
      direction: line['start'][1] - line['end'][1],
    },
  };
};

const getCrossingPoint = (verticalLine, horizontalLine) => {
  let crossingPoint;

  const vertical = returnVerticalModel(verticalLine);
  const horizontal = returnHorizontalModel(horizontalLine);

  const inSameRangeX =
    vertical.x >= horizontal.x.min && vertical.x <= horizontal.x.max;
  const inSameRangeY =
    horizontal.y >= vertical.y.min && horizontal.y <= vertical.y.max;

  if (inSameRangeX && inSameRangeY) {
    crossingPoint = [vertical.x, horizontal.y];
    return crossingPoint;
  }

  return crossingPoint;
};

const getCrossingWithDiagonal = (line, lineType, diagonalLine) => {
  let crossingPoint;

  const diagonal = returnDiagonalModel(diagonalLine);
  let selectedLine;
  switch (lineType) {
    case 'horizontal': {
      selectedLine = returnHorizontalModel(line);
      //check if unchangable y is in the range of diagonal y
      let rangeOfDiagonal = [];
      const oneMoveY = diagonal.y.direction > 0 ? 1 : -1;
      const numberOfMoves = diagonal.y.direction / oneMoveY;
      for (let i = diagonal.y.start; i < numberOfMoves; i += oneMoveY) {
        if (selectedLine.y === diagonalLine[i]) {
          crossingPoint = [
            diagonalLine.start.x + (diagonalLine.start.y - selectedLine.y),
            selectedLine.y,
          ];
          return crossingPoint;
        }
      }
      break;
    }

    case 'vertical': {
      selectedLine = returnVerticalModel(line);
      //check if unchangable x is in the range of diagonal x
      let rangeOfDiagonal = [];
      const oneMoveX = diagonal.x.direction > 0 ? 1 : -1;
      const numberOfMoves = diagonal.x.direction / oneMoveX;
      for (let i = diagonal.x.start; i < numberOfMoves; i += oneMoveX) {
        if (selectedLine.x === diagonalLine[i]) {
          crossingPoint = [
            selectedLine.x,
            diagonalLine.start.y + (diagonalLine.start.x - selectedLine.x),
          ];
          return crossingPoint;
        }
      }
      break;
    }
  }
  return crossingPoint;
};

const getOverlappingPoint = (line1, line2, type) => {
  let firstLine;
  let secondLine;
  let overlappingPoint = [];

  switch (type) {
    case 'horizontal': {
      firstLine = returnHorizontalModel(line1);
      secondLine = returnHorizontalModel(line2);
      const min = Math.max(firstLine.x.min, secondLine.x.min);
      const max = Math.min(firstLine.x.max, secondLine.x.max);

      if (firstLine.y === secondLine.y) {
        for (let i = min; i <= max; i++) {
          overlappingPoint.push([i, firstLine.y]);
        }
      }
      break;
    }

    case 'vertical': {
      firstLine = returnVerticalModel(line1);
      secondLine = returnVerticalModel(line2);
      const min = Math.max(firstLine.y.min, secondLine.y.min);
      const max = Math.min(firstLine.y.max, secondLine.y.max);

      if (firstLine.x === secondLine.x) {
        for (let i = min; i <= max; i++) {
          overlappingPoint.push([firstLine.x, i]);
        }
      }
      break;
    }

    case 'diagonal': {
      firstLine = returnDiagonalModel(line1);
      secondLine = returnDiagonalModel(line2);
      // { start: [ 6, 4 ], end: [ 3, 1 ] },
      //[6, 4], [5, 3], [4, 2], [3, 1]

      //second { start: [ 5, 3 ], end: [ 2, 0 ] }
      //[5, 3], [4, 2], [3, 1], [2, 0]

      //overlap => [5, 3], [4, 2], [3, 1]
      const sameDirection =
        firstLine.x.direction === secondLine.x.direction &&
        firstLine.y.direction === secondLine.y.direction;

      if (sameDirection) {
        const overlappingStart = [
          Math.min(firstLine.x.start, secondLine.x.start),
          firstLine.y.start -
            firstLine.x.start +
            Math.min(firstLine.x.start, secondLine.x.start),
        ];

        //get end
        const overlappingEnd = [
          Math.max(firstLine.x.end, secondLine.x.end),
          firstLine.y.end -
            firstLine.x.end +
            Math.min(firstLine.x.end, secondLine.x.end),
        ];

        const move = [
          overlappingEnd.x - overlappingStart.x, //5, 3 => 2
          overlappingEnd.y - overlappingStart.y, //-4
        ];

        for (let i = 0; i <= Math.abs(move[0]); i++) {
          overlappingPoint.push([
            move[0] > 0 ? overlappingStart.x + i : overlappingStart.x - i,
            move[1] > 0 ? overlappingStart.y + i : overlappingStart.y - i,
          ]);
        }
      }
      break;
    }

    default:
      break;
  }

  return overlappingPoint;
};

const checkForMatches = (arr) => {
  //divide lines to vertical or horizontal or diagonal
  const horizontalLine = [];
  const verticalLine = [];
  const diagonalLine = [];
  arr.map((line) => {
    if (isVertical(line)) {
      verticalLine.push(line);
    } else if (isHorizontal(line)) {
      horizontalLine.push(line);
    } else if (isDiagonal(line)) {
      diagonalLine.push(line);
    }
  });

  //get overlapping points
  let overlapingPoints = [];
  for (let i = 0; i < verticalLine.length; i++) {
    const lineVertical1 = verticalLine[i];
    //1. check for crossing point with vertical and horizontal lines
    for (let k = 0; k < horizontalLine.length; k++) {
      const lineHorizontal1 = horizontalLine[k];
      const overlappingPoint = getCrossingPoint(lineVertical1, lineHorizontal1);
      if (overlappingPoint) {
        overlapingPoints.push(overlappingPoint);
      }
    }

    //2. check for overlapping vertical lines
    for (let j = i + 1; j < verticalLine.length; j++) {
      const lineVertical2 = verticalLine[j];
      const overlappingPoint = getOverlappingPoint(
        lineVertical1,
        lineVertical2,
        'vertical'
      );
      if (overlappingPoint) {
        overlapingPoints.push(...overlappingPoint);
      }
    }
  }

  //3. check for overlapping horizontal lines
  for (let i = 0; i < horizontalLine.length; i++) {
    const lineHorizontal2 = horizontalLine[i];
    for (let j = i + 1; j < horizontalLine.length; j++) {
      const lineHorizontal3 = horizontalLine[j];
      const overlappingPoint = getOverlappingPoint(
        lineHorizontal2,
        lineHorizontal3,
        'horizontal'
      );
      if (overlappingPoint) {
        overlapingPoints.push(...overlappingPoint);
      }
    }
  }

  for (let i = 0; i < diagonalLine.length; i++) {
    const diagonalLine1 = diagonalLine[i];
    //4. check for overlapping diagonal lines
    for (let j = i + 1; j < diagonalLine.length; j++) {
      const diagonalLine2 = diagonalLine[j];
      const overlappingPoint = getOverlappingPoint(
        diagonalLine1,
        diagonalLine2,
        'diagonal'
      );
      if (overlappingPoint) {
        overlapingPoints.push(...overlappingPoint);
      }
    }

    //5. check for crossing point with vertical and diagonal lines
    for (let k = 0; k < horizontalLine.length; k++) {
      const lineHorizontal4 = horizontalLine[k];
      const overlappingPoint = getCrossingWithDiagonal(
        lineHorizontal4,
        'horizontal',
        diagonalLine1
      );
      if (overlappingPoint) {
        overlapingPoints.push(overlappingPoint);
      }
    }

    //6. check for crossing point with horizontal and diagonal lines
    for (let l = 0; l < verticalLine.length; l++) {
      const lineVertical3 = verticalLine[l];
      const overlappingPoint = getCrossingWithDiagonal(
        lineVertical3,
        'vertical',
        diagonalLine1
      );

      if (overlappingPoint) {
        overlapingPoints.push(overlappingPoint);
      }
    }
  }

  console.log('overlapping', overlapingPoints);

  //get unique overlapping points
  const uniqueOverlappingPoints = [
    ...new Set(overlapingPoints.map((arr) => arr.toString())),
  ];

  console.log('uniqueOverlappingPoints', uniqueOverlappingPoints.length);
};

checkForMatches(exampleStringArr);
//checkForMatches(stringArr);
