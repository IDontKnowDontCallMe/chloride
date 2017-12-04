const VideoService = require('../service/VideoService');
const path = require('path');


const videoExt = ['.mp4','.flv','.mkv'];

async function uploadTempVideo({qquuid,tempFilePath}) {

    let extName = path.extname(tempFilePath);

    if(videoExt.includes(extName)){
        return {
            success: true,
            qquuid: qquuid,
            tempFilePath: tempFilePath,
        }
    }
    else {
        return {
            success: false,
        }
    }

}

async function createVideo(param, authorId){

    let videoParam = {
        name: param.name,
        tempFilePath: param.tempFilePath,
        newFileName: param.qquuid,
        authorId: authorId,
    }

    let video = await VideoService.createVideo(videoParam);

    VideoService.transformVideo(videoParam.tempFilePath, videoParam.newFileName, video.id)

    return {
        success: true,

    }

}

module.exports = {
    uploadTempVideo,
    createVideo
}