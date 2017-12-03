const PostModel = require('../model').Post;
const PostCommentModel = require('../model').PostComment;
const UserModel = require('../model').User;



async function getPostList( order) {

    let result = [];
    let postList = [];

    if(order === '发帖时间'){

        postList = await PostModel.findAll({
            include: [{
                model: PostCommentModel,
                as: 'comments',
            }],
            order: [['createdAt', 'DESC']]})

    }
    else if(order === '回复时间'){

        postList = await PostModel.findAll({
            include: [{
                model: PostCommentModel,
                as: 'comments',
            }],
            order: [['updatedAt', 'DESC']]})

    }
    else if(order === '回复数量'){

        postList = await PostModel.findAll({
            include: [{
                model: PostCommentModel,
                as: 'comments',
            }],
            order: [['createdAt', 'DESC']]})

        postList.sort(function (a, b) {
            return b.comments.length - a.comments.length;
        })

    }

    for(post of postList){

        result.push({
            url: '',
            postId: post.id,
            postName: post.title,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            answerNum: post.comments.length,
        })

    }

    return result;

}

async function createPost(post ,authorId){

    console.log(post.content)

    let result = await PostModel.create({
        title: post.title,
        content: post.content,
        authorId: authorId,
    });

    return result;

}

async function getPostDetail(postId) {

    let post = await PostModel.findById(postId);

    if(post == null){
        return null;
    }

    let author = await UserModel.findById(post.authorId);

    return {
        postId: post.id,
        postName: post.title,
        authorId: post.authorId,
        authorName: author.username,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,

        postCommentList: [],
    }

}

module.exports = {
    createPost,
    getPostDetail,
    getPostList

}