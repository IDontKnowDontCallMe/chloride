const UserModel = require('../model').User;

/*
* user:{
*      username:string
*      password:string
*}
*
* return: true || false 添加成功与否
*
*
* */
async function addUser(user) {

    let u1 = await UserModel.findOne({ where: { username: user.username }, raw: true });

    if(u1===null){
        await UserModel.create({ username: user.username, password: user.password, popularity:0, activityValue:100 });

        return true;
    }
    else {
        return false;
    }

    
}

/*
* param:{
*      username:string
*      password:string
*}
*
* return: {
*
*       message: success || passwordErr || noUser
*       user: user instance if 'success || null if 'passwordErr' or 'noUser'
* }
*
*
* */
async function verifyPassword(param) {

    console.log('verrify password')

    let u1 = await UserModel.findOne({ where: { username: param.username }, raw: true });

    if(u1===null){

        return {message: 'noUser', user:null};
    }
    else {

        if(param.password === u1.password){
            return {message: 'success', user:u1};
        }
        else {
            return {message: 'passwordErr', user: null};
        }

    }

}

/*
* id: int
*
*
*
* return: {
*
*       message: success || passwordErr || noUser
*
* }
*
*
* */
async function getUserById(id) {

    return await UserModel.findById(id);

}

/*
* id: int
*
*
*
* return: {
*
*       message: success || passwordErr || noUser
*
* }
*
*
* */
async function getUserByUsername(username) {

    return await UserModel.findOne({ where: { username: user.username }, raw: true });

}

module.exports = {

    addUser,
    verifyPassword,
    getUserById,
    getUserByUsername,

}