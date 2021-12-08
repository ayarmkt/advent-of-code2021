const { allBoardsObj, drawnNumArr } = require('./input');

// const sampleDraw = [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24];
// const sampleBingo = {
//   0: {
//     0: [22, 13, 17, 11, 0],
//     1: [8, 2, 23, 4, 24],
//     2: [21, 9, 14, 16, 7],
//     3: [6, 10, 3, 18, 5],
//     4: [1, 12, 20, 15, 19],
//   },
//   1: {
//     0: [14, 21, 17, 24, 4],
//     1: [10, 16, 15, 9, 19],
//     2: [18, 8, 23, 26, 20],
//     3: [22, 11, 13, 6, 5],
//     4: [2, 0, 12, 3, 7],
//   },
//   2: {
//     0: [3, 15, 0, 2, 22],
//     1: [9, 18, 13, 17, 5],
//     2: [19, 8, 7, 25, 23],
//     3: [20, 11, 10, 24, 4],
//     4: [14, 21, 16, 12, 6],
//   },
// };

const checkBingoInRow = (board) => {
  let winByRow = false;
  for (const row in board) {
    let curRow = board[row];
    if (curRow.every((num) => num === '-')) {
      winByRow = true;

      return winByRow;
    }
  }
  return winByRow;
};

const checkBingoInColumn = (board) => {
  const columnOfBoard = {};
  let winByColumn = false;

  for (const row in board) {
    const curRow = board[row];
    for (let i = 0; i < 5; i++) {
      if (columnOfBoard[i]) {
        columnOfBoard[i] = [...columnOfBoard[i], curRow[i]];
      } else {
        columnOfBoard[i] = [curRow[i]];
      }
    }

    for (const key in columnOfBoard) {
      if (
        columnOfBoard[key].length === 5 &&
        columnOfBoard[key].every((num) => num === '-')
      ) {
        winByColumn = true;

        return winByColumn;
      }
    }
  }
  return winByColumn;
};

const checkWinner = (allBoards, key) => {
  let winnerKey;
  const winByRow = checkBingoInRow(allBoards[key]);
  const winByColumn = checkBingoInColumn(allBoards[key]);

  if (winByRow || winByColumn) {
    winnerKey = key;
    return winnerKey;
  }

  return winnerKey;
};

const getRemainingSum = (board) => {
  let sum = 0;
  for (const key in board) {
    const curRow = board[key];
    const filteredRow = curRow.filter((num) => num !== '-');
    if (filteredRow.length !== 0) {
      sum += filteredRow.reduce((acc, cur) => acc + cur);
    }
  }
  return sum;
};

const playBingo = (bingoObj, drawArr) => {
  let winnersKey = new Set();
  let lastWinner;
  const numberOfBoards = Object.keys(bingoObj).length;

  //draw one number
  for (let i = 0; i < drawArr.length; i++) {
    const curDraw = drawArr[i];

    //mark the number drawn on each board
    for (const key in bingoObj) {
      const curBoard = bingoObj[key];
      for (const row in curBoard) {
        const curRow = curBoard[row];
        if (curRow.includes(curDraw)) {
          curRow.splice(curRow.indexOf(curDraw), 1, '-');
        }
      }

      //check and store the winner until there are 100 winners
      if ([...winnersKey].length === numberOfBoards) {
        const sum = getRemainingSum(bingoObj[lastWinnerKey]);
        console.log('answer', sum * curDraw);
        return sum * curDraw;
      } else if ([...winnersKey].length === numberOfBoards - 1) {
        lastWinnerKey = checkWinner(bingoObj, key);
        winnersKey.add(lastWinnerKey);
      } else if (checkWinner(bingoObj, key)) {
        winnersKey.add(checkWinner(bingoObj, key));
      }
    }
  }
};

//playBingo(sampleBingo, sampleDraw);
playBingo(allBoardsObj, drawnNumArr);
