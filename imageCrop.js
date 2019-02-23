const fs = require('fs');
const jimp = require('jimp');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter directory to crop images in: ', (directory) => {
    

    let outputFolder = directory + '/cropped/';

    if(!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder)
    }
    rl.close();

    fs.readdir(directory, (err, files) => {
        err ? console.log : null;

        files.forEach(file => {
            Crop(file, directory, outputFolder);
        })
    })
})

Crop = (filename, directory, outputFolder) => {
    jimp.read(directory + '/' + filename)
    .then(image => {
        console.log(`cropping ${filename}`)
        return image
            .crop(500, 500, 500, 500)
            .write(outputFolder + filename);
    })
    .catch(err => {
        console.error(err);
    });
}