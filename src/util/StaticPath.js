const path = require('path');




module.exports = {
    ip: 'http://localhost:3000',
    avatarDir: 'http://localhost:3000/images/avatar',
    originPath: 'http://localhost:3000/images/origin',
    thumbnailPath: 'http://localhost:3000/images/thumbnail',
    originImgDir: path.resolve(__dirname, '../../statics/images/origin'),
    thumbnailDir: path.resolve(__dirname, '../../statics/images/thumbnail'),


}