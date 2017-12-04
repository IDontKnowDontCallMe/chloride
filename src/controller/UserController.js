const UserServicce = require('../service/UserService');
const NotificationService = require('../service/NotificationService');
const AvatarDir = require('../util/StaticPath').avatarDir;
const thumbnailPath = require('../util/StaticPath').thumbnailPath;

/*
*
* param:{
*       username:
*       password:
* }
*
 */
async function login(param) {

    let loginResult = await UserServicce.verifyPassword(param);

    return loginResult;

}

/*
*
* param:{
*       username:
*       password:
* }
*
 */
async function register(param) {

    let result = await UserServicce.addUser({username: param.username, password: param.password})

    if(result){
        return {message:'success register', success:true}
    }
    else {
        return {message:'error register', success:false}
    }

}

async function getUserInfo(userId, requestId) {

    let userInfo =  await UserServicce.getUserById(userId);
    if(userInfo===null){
        return {
            success: false
        }
    }

    let requestFollowings = [];
    let hasFollowed = false;
    if(requestId!==null){
        requestFollowings = await UserServicce.getFollowingsOf(requestId);
    }

    for(const following of requestFollowings){
        if(following.id===userId){
            hasFollowed = true;
            break;
        }
    }

    let albumList = [];
    let albums = await userInfo.getAlbums();
    for(album of albums){
        albumList.push({
            url: '',
            coverUrl: thumbnailPath+album.coverImg,
            name: album.name,
            starNum: album.star,
            albumId: album.id,
        },)
    }

    let postList = [];
    let posts = await userInfo.getPosts();
    for(post of posts){
        postList.push({
            url: '',
            postId: post.id,
            postName: post.title,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            answerNum: 0,
        })
    }

    return {
        success: true,
        userId: userInfo.id,
        userName: userInfo.name,
        userAvatar: AvatarDir+userInfo.avatar,
        hasFollowed: hasFollowed,

        albumList: albumList,
        postList: postList,
    }

}

async function addFollowing(followerId, followingId){

    let result = await UserServicce.addFollowing(followerId, followingId);

    if(result){
        return {
            success: true
        }
    }
    else {
        return {
            success: false
        }
    }

}

async function cancelFollowing(followerId, followingId){

    let result = await UserServicce.cancelFollowing(followerId, followingId);

    if(result){
        return {
            success: true
        }
    }
    else {
        return {
            success: false
        }
    }

}

async function getPeopleInfo(userId) {

    let followersList = [];
    let followingsList = [];

    let [followers, followings, notifications] = await Promise.all([
        UserServicce.getFollowersOf(userId),
        UserServicce.getFollowingsOf(userId),
        NotificationService.getNotificationOf(userId)
    ])

    for(follower of followers){

        followersList.push({
            id: follower.id,
            avatar: AvatarDir+follower.avatar,
            name: follower.username,
        })

    }

    for(following of followings){

        followingsList.push({
            id: following.id,
            avatar: AvatarDir+following.avatar,
            name: following.username,
        })

    }

    return {
        success: true,

        notificationList: notifications,
        followersList: followersList,
        followingsList: followingsList,
    }

}


module.exports = {

    login,
    register,
    getUserInfo,
    addFollowing,
    cancelFollowing,
    getPeopleInfo

};