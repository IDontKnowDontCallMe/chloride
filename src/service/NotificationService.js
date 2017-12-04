const UserModel = require('../model').User;
const NotificationModel = require('../model').Notification;
const PostModel = require('../model').Post;
const PostCommentModel = require('../model').PostComment;
const AlbumModel = require('../model').Album;
const AlbumComment = require('../model').AlbumComment;
const avatarDir = require('../util/StaticPath').avatarDir;


async function addNotification(type, makerId, itemId) {

    switch (type){

        case 1:
            await __addCreatingAlbumNotification(makerId, itemId)
            break;
        case 2:
            await __addCreatingPostNotification(makerId, itemId)
            break;
        default:
            break;

    }


}

async function getNotificationOf(userId){

    let notifications = await NotificationModel.findAll({where: {receiverId: userId}, order:[['createdAt', 'DESC']]});

    let result = [];

    for(notification of notifications){

        let temp = await __tansformNotification(notification);
        if(temp !== null){
            result.push(temp);
        }

    }

    return result;

}

async function __addCreatingPostNotification(authorId,　postId){

    let author = await UserModel.findById(authorId);
    let followersList = await author.getFollowers();

    if(followersList.length===0){
        return;
    }
    else {

        let promiseList = [];
        for(follower of followersList){
            promiseList.push(NotificationModel.create({
                type: 2,
                makerId: authorId,
                receiverId: follower.id,
                itemId: postId,
            }))
        }

        await Promise.all(promiseList)

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

async function __tansformNotification(notification){


    let temp = null;
    let maker = null;
    let item = null;
    switch (notification.type){
        case 1:
            [maker, item] = await Promise.all([UserModel.findById(notification.makerId), AlbumModel.findById(notification.itemId)]);
            temp = {
                id: notification.id,
                type: 1,
                makerId: notification.makerId,
                makerName: maker.username,
                makerAvatar: avatarDir+maker.avatar,
                receiverId: notification.receiverId,
                itemId: notification.itemId,
                itemName: item.name,
                createdAt: notification.createdAt
            };
            break;
        case 2:
            [maker, item] = await Promise.all([UserModel.findById(notification.makerId), PostModel.findById(notification.itemId)]);
            temp = {
                id: notification.id,
                type: 2,
                makerId: notification.makerId,
                makerName: maker.username,
                makerAvatar: avatarDir+maker.avatar,
                receiverId: notification.receiverId,
                itemId: notification.itemId,
                itemName: item.name,
                createdAt: notification.createdAt
            };
            break;
        case 3:
            break;
        case 4:
            [maker, item] = await Promise.all([UserModel.findById(notification.makerId), AlbumComment.findById(notification.itemId)]);
            temp = {
                id: notification.id,
                type: 4,
                makerId: notification.makerId,
                makerName: maker.username,
                makerAvatar: avatarDir+maker.avatar,
                receiverId: notification.receiverId,
                itemId: notification.itemId,
                itemName: item.name,
                createdAt: notification.createdAt
            };
            break;
        case 5:
            [maker, item] = await Promise.all([UserModel.findById(notification.makerId), PostCommentModel.findById(notification.itemId)]);
            temp = {
                id: notification.id,
                type: 5,
                makerId: notification.makerId,
                makerName: maker.username,
                makerAvatar: avatarDir+maker.avatar,
                receiverId: notification.receiverId,
                itemId: notification.itemId,
                itemName: item.name,
                createdAt: notification.createdAt
            };
            break;
        case 6:
            [maker, item] = await Promise.all([UserModel.findById(notification.makerId), PostCommentModel.findById(notification.itemId)]);
            temp = {
                id: notification.id,
                type: 6,
                makerId: notification.makerId,
                makerName: maker.username,
                makerAvatar: avatarDir+maker.avatar,
                receiverId: notification.receiverId,
                itemId: notification.itemId,
                itemName: item.name,
                createdAt: notification.createdAt
            };
            break;
        default:
            console.log('no this notification type!')
            break;

    }

    return temp;

}


module.exports = {

    addNotification,
    getNotificationOf

}