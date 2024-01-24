const fs = require('fs');
const path = require('path');
const assetsWay = path.join(__dirname, 'assets');
const projectDist = path.join(__dirname, 'project-dist');

// Creat folder project-dist
function createFolderProjectDist() {
  fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
  });
}
createFolderProjectDist();

// Add assets folder into project dist
function addAssets() {
  fs.mkdir(
    path.join(__dirname, 'project-dist', 'assets'),
    { recursive: true },
    (err) => {
      if (err) {
        return console.error(err);
      }
    },
  );
  
  fs.readdir(assetsWay, (err, folders) => {
    if (err) console.log(err);
    else {
      folders.forEach((folder) => {
        fs.mkdir(
          path.join(__dirname, 'project-dist', 'assets', folder),
          { recursive: true },
          (err) => {
            if (err) console.log(err);
          },
        );
      });
    }
  });
}
addAssets();

function copyFileFromFolder() {
  fs.readdir(assetsWay, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        let pathToFile = path.join(__dirname, 'assets', file.name);
        let pathToFileCopy = path.join(
          __dirname,
          'project-dist',
          'assets',
          file.name,
        );
        fs.readdir(pathToFile, { withFileTypes: true }, (err, files) => {
          if (err) console.log(err);
          else {
            files.forEach((f) => {
              let fileIntoFolder = path.join(pathToFile, f.name);
              let fileCopyDist = path.join(pathToFileCopy, f.name);
              fs.copyFile(fileIntoFolder, fileCopyDist, (err) => {
                if (err) {
                  console.log('Error Found:', err);
                }
              });
            });
          }
        });
      });
    }
  });
}
copyFileFromFolder();

// Create HTML
const htmlComponents = path.join(__dirname, 'components');

function templateHtml() {
  fs.readFile(
    path.join(__dirname, 'template.html'),
    'utf8',
    (err, dataTemplate) => {
      if (err) console.log(err);
      fs.readdir(htmlComponents, { withFileTypes: true }, (err, components) => {
        if (err) console.log(err);
        components.forEach((component) => {
          if (component.isFile() && path.extname(component.name)) {
            fs.readFile(
              path.join(__dirname, 'components', component.name),
              'utf8',
              (err, dataComponent) => {
                let nameComponent = `{{${path.basename(
                  component.name,
                  path.extname(component.name),
                )}}}`;
                dataTemplate = dataTemplate.replace(
                  `${nameComponent}`,
                  dataComponent,
                );
                fs.writeFile(
                  path.join(`${projectDist}`, 'index.html'),
                  dataTemplate,
                  function (err) {
                    if (err) console.log(err);
                  },
                );
              },
            );
          }
        });
      });
    },
  );
}
templateHtml();

// Add Styles
const folderWithStyles = path.join(__dirname, 'styles');
let projectDistStyle = path.join(__dirname, 'project-dist', 'style.css');

function addStyles() {
  fs.writeFile(projectDistStyle, '', (err) => {
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
              fs.appendFile(projectDistStyle, data, (err) => {
                if (err) throw err;
              });
            });
          }
        }
      });
    }
  });
}
addStyles();