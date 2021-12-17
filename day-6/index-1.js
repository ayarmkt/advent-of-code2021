const { textArr } = require('./input');

const example = [3, 4, 3, 1, 2];

const getNumberOfFish = (arr) => {
  const days = 80;
  let curArr = arr;
  //console.log('curArr', curArr);
  for (let i = 1; i <= days; i++) {
    let newArr = [];
    curArr.map((num) => {
      if (num === 0) {
        newArr.push(6);
        newArr.push(8);
      } else {
        newArr.push(num - 1);
      }
    });
    curArr = newArr;
    console.log('curArr.length', curArr.length);
  }
};

//getNumberOfFish(example);
getNumberOfFish(textArr);
