const fs = require('fs');
const path = require('path');

let currentFolder = path.join(__dirname, 'secret-folder');

fs.readdir(currentFolder, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      if (file.isFile()) {
        let pathToFile = path.join(currentFolder, file.name);
        fs.stat(pathToFile, (err, stats) => {
          if (err) throw err;

          let infoFile = path.parse(pathToFile);
          console.log(`${infoFile.name} - ${infoFile.ext.replace('.', '')} - ${stats.size}`);
        });
      }
    });
  }
});
