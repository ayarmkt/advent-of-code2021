const { textArrExample } = require('./example');
const { textArr } = require('./input');

const getLeastFuel = (arr) => {
  const min = arr.reduce((prev, cur) => Math.min(prev, cur), 1);
  const max = arr.reduce((prev, cur) => Math.max(prev, cur), 1);
  console.log(min, max);

  let finalFuel = 0;

  //each index
  for (let i = min; i <= max; i++) {
    let fuel = 0;

    //check all num for the index
    for (const num of arr) {
      fuel += Math.abs(num - i);
    }

    if (fuel < finalFuel || finalFuel === 0) {
      finalFuel = fuel;
    }
  }
  console.log('finalFuel', finalFuel);
};

//getLeastFuel(textArrExample);
getLeastFuel(textArr);
