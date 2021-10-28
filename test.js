const fs = require('fs');
const path = require('path');

const testJsonFile = path.resolve(__dirname, './test.json');

const data = fs.readFileSync(testJsonFile, 'UTF-8').toString();
let config = JSON.parse(data);

console.log(data);
