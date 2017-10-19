
function getUser(userId) {
    return  {
        userName: 'testGetUser',
        userId: userId,
    }
}

function addUser(userId) {
    return  {
        userName: 'testAddUser',
        userId: userId,
    }
}


module.exports = {
    getUser, addUser
}