const fs = require('fs');

//get drawn number
const drawnNum = fs
  .readFileSync('./day-4/input-drawnNum.txt')
  .toString('utf-8');
const drawnNumArr = drawnNum.split(',').map((num) => parseInt(num));

//get bingo board
const bingo = fs.readFileSync('./day-4/input-bingo.txt').toString('utf-8');
const bingoArrOfStr = bingo.split('\n');
const arrOf5Num = bingoArrOfStr
  .map((str) => str.replace('\r', ''))
  .filter((str) => str !== '')
  .map((str) => str.split(' '))
  .map((arr) => arr.filter((str) => str !== '').map((str) => parseInt(str)));

let allBoards = [];
for (let i = 0; i < arrOf5Num.length - 4; i += 5) {
  let oneBoard = {};
  for (let j = 0; j < 5; j++) {
    oneBoard[j] = arrOf5Num[i + j];
  }
  allBoards.push(oneBoard);
}
const allBoardsObj = { ...allBoards };

module.exports = { allBoardsObj, drawnNumArr };
