const fs = require('fs');
const fsProm = require('fs/promises');
const path = require('path');
const assetsWay = path.join(__dirname, 'assets');
const projectDist = path.join(__dirname, 'project-dist');
// console.log(assetsWay)

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
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
})

fs.readdir(assetsWay, (err, folders) => {
  if (err) console.log(err);
  else {
    // console.log('\nCurrent directory filenames:');
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

function copyFileFromFolder() {
  console.log('\nCurrent filenames:');
  fs.readdir(assetsWay, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        let pathToFile = path.join(__dirname, 'assets', file.name);
        let pathToFileCopy = path.join(__dirname, 'project-dist', 'assets', file.name);
        fs.readdir(pathToFile, { withFileTypes: true }, (err, files) => {
          if (err) console.log(err);
          else {
            files.forEach((f) => {
              let fileIntoFolder = path.join(pathToFile, f.name);
              let fileCopyDist = path.join(pathToFileCopy, f.name);
              // console.log(fileIntoFolder)
              // console.log(fileCopyDist)
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
const htmlComponents = path.join(__dirname, 'components')
// console.log(htmlComponents)

function templateHtml() {
  fs.readFile(path.join(__dirname, 'template.html'), 'utf8', (err, dataTemplate) => {
    if (err) console.log(err);
    // console.log(dataTemplate)

    fs.readdir(htmlComponents, { withFileTypes: true }, (err, components) => {
      if (err) console.log(err);
      // console.log(components) // array with components
      let str = dataTemplate.toString()
      components.forEach((component) => {
        if (component.isFile() && path.extname(component.name)) {
          // console.log(component.name)
          fs.readFile(path.join(__dirname, 'components', component.name), 'utf8', (err, dataComponent) => {
            let nameComponent = `{{${path.basename(component.name, path.extname(component.name))}}}`
            str = dataTemplate.replace(`${nameComponent}`, dataComponent)
            console.log(str)
          })
        }
      })
      // console.log(str) 
    });
  })

}
templateHtml()



// async function createHtml() {
//   try {
//     let templateHtml = await fsProm.readFile(__dirname + '/' + 'template.html');
//     // console.log(templateHtml.toString())
//     let htmlComponents = await fsProm.readdir(__dirname + '/' + 'components', {withFileTypes: true});
//     // console.log(htmlComponents)
//     let htmlTxt = templateHtml.toString();
//     let currentPart = '';
//     for (const component of htmlComponents) {
//       if (component.isFile() && path.extname(component.name) === '.html'){
//         currentPart = await fsProm.readFile(__dirname + '/components/' + `${component.name}`);
//         // console.log(currentPart)
//         htmlTxt = htmlTxt.replace(`{{${component.name.slice(0, -5)}}}`, currentPart.toString());
//         console.log(htmlTxt)
//         // console.log(currentPart.toString())
//       }
//     }
//     // fsProm.writeFile(__dirname + '/project-dist/index.html', htmlTxt);

//   }  catch(err) {
//     console.log((err)); 
//   }
// }

// createHtml();