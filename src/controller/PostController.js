const PostService = require('../service/PostService');
const NotificationService = require('../service/NotificationService');

async function createPost(param, authorId) {

    let postParam = {
        title: param.headName,
        content: param.content,
    }

    let post = await PostService.createPost(postParam, authorId)

    await NotificationService.addNotification(2, authorId, post.id);

    return {
        success: true,
        postId: post.id,
    }

}

async function getPostDetail(postId){

    let post = await PostService.getPostDetail(postId);

    post.success = true;

    return post;

}

async function getPostList(order){

    let postList = await PostService.getPostList(order);


    return {
        postList: postList,
        success: true
    };

}



module.exports = {
    createPost,
    getPostDetail,
    getPostList
}