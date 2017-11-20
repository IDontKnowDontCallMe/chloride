const TagModel = require('../model').Tag;
const AlbumModel = require('../model').Album;



async function associateTagsAndAlbum(tags, albumId){

    let promiseList = [];
    let result = [];
    let album = await AlbumModel.findById(albumId);
    for(tag of tags){
        promiseList.push(__associateTagAndAlbum(tag, album));
        let temp = null;
        result.push(temp);
    }

    if(promiseList.length===0){
        return;
    }

    result = await Promise.all(promiseList);


}

async function __associateTagAndAlbum(tagTitle, album) {

    let tag = await TagModel.findOne({ where: {title: tagTitle}})
    if(tag===null){

        tag = await TagModel.create({
            title: tagTitle,
            usingNum: 0,
        })

    }

    await Promise.all([ album.addAlbumTags(tag), tag.increment('usingNum',{by: 1})]);


}

module.exports = {

    associateTagsAndAlbum,

}