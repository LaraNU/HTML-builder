const fs = require('fs');
const process = require('process');
// const { stdin, stdout } = process;
const path = require('path');
const readline = require('readline');

let rl = readline.createInterface(process.stdin, process.stdout);
let writeableStream = fs.createWriteStream(
  path.join(__dirname, 'new-text.txt'),
);
console.log('Hello, please write ...');

rl.on('line', (input) => {
  if (input === 'exit') {
    rl.close();
  }
  if (input !== 'exit') {
    writeableStream.write(input + '\n');
  }
});

process.on('exit', () => {
  console.log('You exited from file. Good bye!');
});
