const fs = require('fs');
const path = require('path');

let result = path.join('01-read-file', 'text.txt');
let reader = fs.createReadStream(result);

reader.on('data', function (chunk) {
  console.log(chunk.toString());
});
