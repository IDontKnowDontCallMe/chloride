const PostModel = require('../model').Post;
const PostCommentModel = require('../model').PostComment;
const UserModel = require('../model').User;
const avatarDir = require('../util/StaticPath').avatarDir;



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

    let [author, postCommentList] = await Promise.all([UserModel.findById(post.authorId), __getPostComments(postId)]);

    return {
        postId: post.id,
        postName: post.title,
        authorId: post.authorId,
        authorName: author.username,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,

        postCommentList: postCommentList,
    }

}


async function addComment({userId, toId, postId, content}) {

    await PostCommentModel.create({
        content: content,
        postId: postId,
        authorId: userId,
        to: toId,
    });

    return await __getPostComments(postId);

}

async function __getPostComments(postId) {

    let comments = await PostCommentModel.findAll({where: {postId: postId}, order:[['createdAt', 'ASC']]});
    let result = [];

    for(comment of comments){

        let author = await comment.getAuthor()

        result.push({
            authorId: author.id,
            authorName: author.username,
            authorAvatar: avatarDir + author.avatar,
            createdAt : comment.createdAt,
            content: comment.content,
            toId: comment.to,
        })
    }

    return result;

}

module.exports = {
    createPost,
    getPostDetail,
    getPostList,
    addComment

}