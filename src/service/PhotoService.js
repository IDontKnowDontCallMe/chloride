const PhotoModel = require('../model').Photo;
const GraphMagicService = require('./GraphMagicService');
const originImgDir = require('../util/StaticPath').originImgDir;
const thumbnailDir = require('../util/StaticPath').thumbnailDir;
const fs = require('fs');
const path = require('path');
const bluePromise = require('bluebird');

bluePromise.promisifyAll(fs);

async function createPhotos(tempFileList, dependentAlbumId){

    console.log(tempFileList)

    let promiseList = [];
    let result = [];
    for(tempFile of tempFileList){
        //console.log('start')
        promiseList.push(__createPhoto(tempFile, dependentAlbumId));
        let temp = null;
        result.push(temp);
        //console.log('end')

    }

    result = await Promise.all(promiseList);

    //返回封面地址
    return result[0]['imgPath'];
}

async function __createPhoto({tempFilePath, qquuid}, albumId) {
    //console.log('start')
    //console.log(tempFilePath)

    let imgFormat = await GraphMagicService.validateIsImageFile(tempFilePath);

    // console.log('mid')

    if(!imgFormat){
        throw 'not image file error!'
    }

    let newFileName = qquuid + '.' + imgFormat.toLowerCase();

    await fs.renameAsync(tempFilePath, path.join(originImgDir, newFileName));

    let [sizeResult, noMeaning] = await Promise.all([GraphMagicService.getWidthAndHeight(path.join(originImgDir, newFileName)),
                                            GraphMagicService.createSmallGraph(path.join(thumbnailDir, newFileName), path.join(originImgDir, newFileName))]);

    let newPhoto = await PhotoModel.create({
        origin: '/'+newFileName,
        width: sizeResult.width,
        height: sizeResult.height,
        albumId: albumId
    });

    //console.log('end')


    return {
        photoId: newPhoto.id,
        imgPath: newPhoto.origin,
    };

}


module.exports = {
    createPhotos
}