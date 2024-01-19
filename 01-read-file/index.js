const fs = require('fs');
const path = require('path');

let result = path.resolve('01-read-file', 'text.txt');
reader = fs.createReadStream(result); 
  
reader.on('data', function (chunk) { 
    console.log(chunk.toString()); 
});