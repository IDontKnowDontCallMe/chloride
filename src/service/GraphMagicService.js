const fs = require('fs');
const gm = require('gm');
const path = require('path')
const Promise = require('bluebird');

Promise.promisifyAll(gm.prototype)


async function validateIsImageFile(filePath) {
    // let relativePath =  path.relative('./', filePath);
    // console.log(relativePath)
    // let readStream = fs.createReadStream(filePath);

    let result = false;

    try{

        let format = await gm(filePath).formatAsync();

        if(format === 'JPG' || format === 'JPEG' || format === 'PNG' || format === 'GIF' ){
            result = format;
        }
    }
    catch (e){
        result = false;
    }


    return result;

}

async function getWidthAndHeight(filePath){
    let result = null;

    try{
        //console.log('getWidthAndHeight')
        //console.log(filePath)
         result = await gm(filePath).sizeAsync();

        //console.log(result)
    }
    catch (e){
        result = null;
    }

    return result;


}

async function createSmallGraph(targetPath, sourcePath){

    let writeStream = fs.createWriteStream(targetPath);
    gm(sourcePath)
        .resize('200', '200')
        .stream()
        .pipe(writeStream);

}

module.exports = {
    validateIsImageFile,
    getWidthAndHeight,
    createSmallGraph
}