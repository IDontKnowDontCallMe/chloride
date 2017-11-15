var fs = require('fs')
    , gm = require('gm')
    , md5 = require('../util/md5');

const PhotoService = require('./GraphMagicService')

// gm('./12.jpg').identify(function (err, value) {
//     console.log(value)
// });

const as = async ()=>{

    let result = await PhotoService.validateIsImageFile('./a.txt');
    console.log(result)

}

as()

