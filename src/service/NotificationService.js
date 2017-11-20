const UserModel = require('../model').User;
const NotificationModel = require('../model').Notification;


async function addNotification(type, makerId, itemId) {

    switch (type){

        case 1:
            await __addCreatingAlbumNotification(makerId, itemId)
            break;
        default:
            break;

    }


}

async function __addCreatingAlbumNotification(authorId, albumId) {
    let author = await UserModel.findById(authorId);
    let followersList = await author.getFollowers();

    if(followersList.length===0){
        return;
    }
    else {

        let promiseList = [];
        for(follower of followersList){
            promiseList.push(NotificationModel.create({
                type: 1,
                makerId: authorId,
                receiverId: follower.id,
                itemId: albumId,
            }))
        }

        await Promise.all(promiseList)

    }

}


module.exports = {

    addNotification

}