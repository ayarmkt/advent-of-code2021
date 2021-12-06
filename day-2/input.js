//ERROR:index.js:3 Uncaught ReferenceError: require is not defined
// const fs = require('fs');
// const text = fs.readFileSync('./input.txt').toString('utf-8');
// const stringArr = text.split('\n');
// module.exports = { stringArr };

//ERROR:Uncaught TypeError: Failed to resolve module specifier "fs". Relative references must start with either "/", "./", or "../".
import fs from 'fs';
//import * as fs from 'fs';
const text = fs.readFileSync('./input.txt').toString('utf-8');
export const stringArr = text.split('\n');
