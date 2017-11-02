var fs = require('fs')
    , gm = require('gm')
    , md5 = require('../util/md5');

// gm('./12.jpg').identify(function (err, value) {
//     console.log(value)
// });

fs.readFile('./a.txt', function(err, buf) {
    console.log(md5(buf));
});

