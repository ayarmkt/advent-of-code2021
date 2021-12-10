const { stringArr, exampleStringArr } = require('./input-1');
//7318

const isVertical = (line) => {
  return line['start'][0] === line['end'][0];
};

const isHorizontal = (line) => {
  return line['start'][1] === line['end'][1];
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
    default:
      break;
  }

  return overlappingPoint;
};

const checkForMatches = (arr) => {
  //divide lines to vertical or horizontal
  const horizontalLine = [];
  const verticalLine = [];
  arr.map((line) => {
    if (isVertical(line)) {
      verticalLine.push(line);
    } else if (isHorizontal(line)) {
      horizontalLine.push(line);
    }
  });

  //get overlapping points
  let overlapingPoints = [];
  for (let i = 0; i < verticalLine.length; i++) {
    const lineVertical1 = verticalLine[i];
    //1. check for crossing point with horizontal lines
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

  //get unique overlapping points
  const uniqueOverlappingPoints = [
    ...new Set(overlapingPoints.map((arr) => arr.toString())),
  ];

  console.log('uniqueOverlappingPoints', uniqueOverlappingPoints.length);
};

//checkForMatches(exampleStringArr);
checkForMatches(stringArr);
