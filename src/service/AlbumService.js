const AlbumModel = require('../model').Album;
const TagModel = require('../model').Tag;
const AlbumComment = require('../model').AlbumComment;
const PhotoModel = require('../model').Photo;
const UserModel = require('../model').User;
const originPath = require('../util/StaticPath').originPath;
const avatarDir = require('../util/StaticPath').avatarDir;


let recentCreatedAlbums = [];
let hotAlbums = [];
let allAlbums = [];
/*
* key: theme:string;  object: array:idPriority
*
* idPriority{
*   id: albumId, int
*   name
*   priority: int
* }
*
* */
let themeClassifyMap = new Map();
let tagClassifyMap = new Map();



function calculatePriority(album) {

    return album.star;
}

async function initAlbumService() {

    let albumList = AlbumModel.findAll({raw: true, include:[{ model: TagModel, as: 'albumTags' }], order:[['createdAt', 'DESC']]});

    albumList.forEach(function (album) {

        let priority = calculatePriority(album);

        let simpleInfo = {
            id: album.id,
            name: album.name,
            priority: priority,
        }

        allAlbums.push(simpleInfo);

        if(recentCreatedAlbums.length < 10){
            recentCreatedAlbums.push(simpleInfo);
        }

        if(themeClassifyMap.get(album.theme) === undefined){
            themeClassifyMap.set(album.theme, []);
        }

        themeClassifyMap.get(album.theme).push(simpleInfo);

        album.albumTags.forEach(function (tag) {
            if(tagClassifyMap.get(tag.name)===undefined){
                tagClassifyMap.set(tag.name, []);
            }
            tagClassifyMap.get(tag.name).push(simpleInfo);
        })


    })

}
initAlbumService();

/*
*
* album{
*
*      name: string
*      description: string
*      theme: string
*      authorId: int
*
* }
*
* return albumId
*
* */
async function addAlbum(album){

    let result = await AlbumModel.create({
                            name: album.name,
                            description: album.description,
                            theme: album.theme,
                            authorId: album.authorId,
                            coverImg: ''
                        });

    return result;

}

async function getAlbumDetail(albumId, requestUserId){


    let album = await AlbumModel.findById(albumId);

    if(album===null){
        return null;
    }

    let photoList = [];
    let photos = await album.getPhotos();
    for(photo of photos){

        photoList.push({
            photoId: photo.id,
            url: originPath+photo.origin,
            height: photo.height,
            width: photo.width,
        })

    }

    let author = await album.getAuthor();

    let hasStaredIt = false;
    if(requestUserId){
        let starUser = await album.getStarUsers({where:{id: requestUserId}});
        hasStaredIt = starUser.length===0? false: true;
    }

    let commentList = await __getAlbumComments(albumId);

    return {
        albumId: album.id,
        albumName: album.name,
        theme: album.theme,
        albumDescription: album.description,
        authorId: album.authorId,
        authorName: author.username,

        starNum: album.star,
        hasStaredIt: hasStaredIt,

        photoList: photoList,
        commentList: commentList,
    }

}

async function getAlbumListOfTheme(theme){


    if(theme==='全部'){
        return await AlbumModel.findAll();
    }
    else {
        return await AlbumModel.findAll({where:{theme:theme}})
    }


}

async function addComment({userId, albumId, content}) {

    await AlbumComment.create({
        content: content,
        albumId: albumId,
        authorId: userId,
    });

    return await __getAlbumComments(albumId);

}

async function __getAlbumComments(albumId) {

    let comments = await AlbumComment.findAll({where: {albumId: albumId}, order:[['createdAt', 'ASC']]});
    let result = [];

    for(comment of comments){

        let author = await comment.getAuthor()

        result.push({
            authorId: author.id,
            authorName: author.username,
            authorAvatar: avatarDir + author.avatar,
            createdAt : comment.createdAt,
            content: comment.content,
        })
    }

    return result;

}


async function addAlbumStar({userId, albumId}){
    let album = await AlbumModel.findById(albumId);

    let users = await album.getStarUsers({where:{id: userId}})
    //the user didn't star this album
    if(users.length === 0){

        let user = await UserModel.findById(userId);

        await Promise.all([album.addStarUsers(user) , album.increment('star', {by:1})]);

        return true;
    }
    else {
        return false;
    }

}

async function cancelAlbumStar({userId, albumId}){

    let album = await AlbumModel.findById(albumId);

    let users = await album.getStarUsers({where:{id: userId}})
    //the user did stared this album
    if(users.length !== 0){

        let user = await UserModel.findById(userId);

        await Promise.all([album.removeStarUsers(user), album.decrement('star', {by:1})]);

        return true;
    }
    else {
        return false;
    }

}


module.exports = {

    addAlbum,
    getAlbumDetail,
    getAlbumListOfTheme,
    addComment,
    cancelAlbumStar,
    addAlbumStar

}