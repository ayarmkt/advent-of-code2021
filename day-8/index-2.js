const { textArrExample } = require('./example');
const { textArr } = require('./input');

const checkLength6 = (str, code1, code4) => {
  let alpha = 'abcdefg';

  for (let i = 0; i < str.length; i++) {
    alpha = alpha.replace(str[i], '');
  }

  if (code1.includes(alpha)) {
    return 6;
  } else if (code4.includes(alpha)) {
    return 0;
  } else {
    return 9;
  }
};

const checkLength5 = (str, code1, code4) => {
  let alpha = 'abcdefg';

  for (let i = 0; i < str.length; i++) {
    alpha = alpha.replace(str[i], '');
  }

  if (!code1.includes(alpha[0]) && !code1.includes(alpha[1])) {
    return 3;
  } else if (code4.includes(alpha[0]) && code4.includes(alpha[1])) {
    return 2;
  } else {
    return 5;
  }
};

const analyzePattern = (arr) => {
  let code = {};
  arr.map((str) => {
    switch (str.length) {
      case 2:
        code['1'] = str;

        break;
      case 4:
        code['4'] = str;

        break;
      case 3:
        code['7'] = str;

        break;
      case 7:
        code['8'] = str;

        break;
      case 6: {
        code[checkLength6(str, code['1'], code['4'])] = str;
        break;
      }
      case 5:
        code[checkLength5(str, code['1'], code['4'])] = str;
        break;
      default:
        break;
    }
  });

  return code;
};

const getCode = (arr) => {
  let fourDigitOutputs = [];

  //check each entry
  for (const entry of arr) {
    let fourDigit = [];

    const patterns = entry[0]
      .sort((a, b) => a.length - b.length)
      .map((str) => str.split('').sort().join(''));

    const outputs = entry[1].map((str) => str.split('').sort().join(''));

    const code = analyzePattern(patterns);

    outputs.map((output) => {
      for (const [key, value] of Object.entries(code)) {
        if (output === value) fourDigit.push(key);
      }
    });

    fourDigitOutputs.push(fourDigit.join(''));
  }

  const answer = fourDigitOutputs.reduce(
    (prev, cur) => parseInt(prev) + parseInt(cur)
  );
  console.log(answer);
};

//getCode(textArrExample);
getCode(textArr);
