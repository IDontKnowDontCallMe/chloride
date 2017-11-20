const PhotoService =  require('../service/PhotoService');
const AlbumService = require('../service/AlbumService');
const TagService = require('../service/TagService');
const NotificationService = require('../service/NotificationService');
const thumbnailPath = require('../util/StaticPath').thumbnailPath;

async function createAlbum(param, authorId) {

    let albumParam = {
        name: param.head,
        description: param.description,
        theme: param.theme,
        authorId: authorId,
    }

    let album = await AlbumService.addAlbum(albumParam);

    let [coverImgpath, noMeaning] = await Promise.all([PhotoService.createPhotos(param.imageFiles, album.id), TagService.associateTagsAndAlbum(param.tags, album.id)])

    await album.update({
        coverImg: coverImgpath
    })

    await NotificationService.addNotification(1, authorId, album.id);

    return {
        success: true,
        albumId: album.id,
    }

}

async function getAlbumListOfTheme(theme) {

    let list = await AlbumService.getAlbumListOfTheme(theme);

    let result = [];
    for(album of list){

        result.push({
            url: '',
            coverUrl: thumbnailPath+album.coverImg,
            name: album.name,
            starNum: album.star,
            albumId: album.id,
        })

    }

    return {
        success: true,
        list: result
    };

}

async function getAlbumListOfKeyword(keyword) {

}

async function getAlbumDitali(albumId, userId){

    let album = await AlbumService.getAlbumDetail(albumId, userId);

    album.success = true;

    return album;



}

async function addAlbumComment(album) {

}


module.exports = {
    createAlbum,
    getAlbumListOfTheme,
    getAlbumDitali
}