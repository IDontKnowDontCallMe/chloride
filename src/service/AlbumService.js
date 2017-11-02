const AlbumModel = require('../model').Album;
const TagModel = require('../model').Tag;


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
*      tags: [string]
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
                        });

    return result.id;

}


module.exports = {



}