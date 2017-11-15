const fs = require('fs');
const gm = require('gm');
const Promise = require('bluebird');

Promise.promisifyAll(gm.prototype)


async function validateIsImageFile(filePath) {

    let result = false;

    try{
        let format = await gm(filePath).formatAsync();

        if(format === 'JPG' || format === 'JPEG' || format === 'PNG' || format === 'GIF' ){
            result = true;
        }
    }
    catch (e){
        result = false;
    }


    return result;

}

module.exports = {
    validateIsImageFile,
}