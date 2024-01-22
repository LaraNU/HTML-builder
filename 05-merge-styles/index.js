const fs = require('fs');
const path = require('path');
const folderWithStyles = path.join(__dirname, 'styles');
let projectDist = path.join(__dirname, 'project-dist', 'bundle.css');

fs.writeFile(projectDist, '', (err) => {
  if (err) throw err;
});

fs.readdir(folderWithStyles, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      if (file.isFile()) {
        let pathToFile = path.join(folderWithStyles, file.name);
        if (path.parse(pathToFile).ext === '.css') {
          fs.readFile(pathToFile, 'utf8', function (err, data) {
            if (err) console.log(err);
            let bundelStyles = [];
            bundelStyles.push(data);
            fs.appendFile(projectDist, data, (err) => {
              if (err) throw err;
            });
          });
        }
      }
    });
  }
});
