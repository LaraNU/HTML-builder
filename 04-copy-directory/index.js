const fs = require('fs');
const path = require('path');

let currFolder = path.join(__dirname, 'files');
let copyFolder = path.join(__dirname, 'files-copy');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
});

function copyFileFromFolder() {
  fs.readdir(currFolder, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        let pathToFile = path.join(currFolder, file.name);
        let pathToFileCopy = path.join(copyFolder, file.name);
        fs.copyFile(pathToFile, pathToFileCopy, (err) => {
          if (err) {
            console.log('Error Found:', err);
          }
        });
      });
    }
  });
}

fs.readdir(copyFolder, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      let pathToFileCopy = path.join(copyFolder, file.name);
      fs.unlink(pathToFileCopy, (err) => {
        if (err) console.log(err);
      });
    });
  }
});

copyFileFromFolder();
