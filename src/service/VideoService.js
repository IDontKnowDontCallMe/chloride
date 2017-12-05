const ffmpeg = require('fluent-ffmpeg');
const path = require('path')
const fs = require('fs');
const bluePromise = require('bluebird')
bluePromise.promisifyAll(fs);
const VideoModel = require('../model').Video;
const videoDir = require('../util/StaticPath').videolDir;
const videoPath = require('../util/StaticPath').videolPath;


async function transformVideo(tempFilePath, newFileName, videoId){

    let newFileDir = path.join(videoDir, `/${newFileName}`);

    let exsit = await !fs.existsAsync(newFileDir);
    if(!exsit){
        console.log('create video dir')
        await fs.mkdirAsync(newFileDir);
    }

    let newFilePath = path.join(newFileDir, newFileName);

    await fs.renameAsync(tempFilePath, newFilePath);

    let outputPath = path.join(newFileDir, newFileName+'.m3u8');

    ffmpeg(newFilePath)
        .addOption('-hls_time', 10)
        .addOption('-hls_list_size',0)
        .on('end', async function() {
            console.log('file has been converted succesfully');
            let video = await VideoModel.findById(videoId);

            video.update({
                state: 1,
                origin: `/${newFileName}/${newFileName}.m3u8`,
            })
        })
        .on('error', function(err) {
            console.log('an error happened: ' + err.message);
            //throw new Error(err);
        })
        .save(outputPath)


}

async function createVideo({name, authorId }){

    let video = await VideoModel.create({
        name: name,
        authorId: authorId,
    })

    return video;

}

async function getAllVideos() {

    let videos = await VideoModel.findAll();
    let result = [];

    for(let video of videos){

        result.push({
            id: video.id,
            name: video.name,
            origin: videoPath+video.origin,
        })

    }

    return result;
}


module.exports = {

    transformVideo,
    createVideo,
    getAllVideos

}