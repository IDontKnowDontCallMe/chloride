var fs = require('fs')
    , gm = require('gm')
    , md5 = require('../util/md5');

const GraphMagicService = require('./GraphMagicService')

// gm('./12.jpg').identify(function (err, value) {
//     console.log(value)
// });

const as = async ()=>{

    let result = await GraphMagicService.getWidthAndHeight('C:\\Users\\USER\\Desktop\\ppp\\chloride\\statics\\images\\origin\\4871db6b-4234-44c5-b16d-aa58ec5ff38d.jpeg');
    console.log(result)

}

as()

