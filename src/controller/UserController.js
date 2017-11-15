const UserServicce = require('../service/UserService');

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

async function getUserById(id) {

    return await UserServicce.getUserById(id);

}


module.exports = {

    login,
    register,
    getUserById

};