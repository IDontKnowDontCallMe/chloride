var fs = require('fs')
    , gm = require('gm')
    , md5 = require('../util/md5');

//init the database config, run the code only
var db = require('../model/index');


const GraphMagicService = require('./GraphMagicService');
const PostService = require('./PostService')



// gm('./12.jpg').identify(function (err, value) {
//     console.log(value)
// });

const as = async ()=>{

    await db.sequelize.sync({force: false})

    //let result = await GraphMagicService.getWidthAndHeight('C:\\Users\\USER\\Desktop\\ppp\\chloride\\statics\\images\\origin\\4871db6b-4234-44c5-b16d-aa58ec5ff38d.jpeg');

    let result = await PostService.getPostList('发帖时间');

    console.log(result)

}

as()

