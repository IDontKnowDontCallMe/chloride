const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-body');
const session = require('koa-session');
const cors = require('koa2-cors');
const serve = require('koa-static');

//init the database config, run the code only
var db = require('./model/index');
db.sequelize.sync({force: false}).then(function() {
    console.log("Database successed to init");
}).catch(function(err){
    console.log("Database failed to start due to error: %s", err);
});





const app = new Koa();

//允许跨域
app.use(cors({
    origin: function(ctx) {
        // if (ctx.url === '/test') {
        //     return false;
        // }
        //console.log(ctx.url)
        return 'http://localhost:8080';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Cache-Control', 'X-Requested-With'],
}))

//静态资源映射(先这样应付着吧)
let imagesPath = path.resolve(__dirname, '../statics');
app.use(serve(imagesPath));



//cookie 加密(签名)秘钥, 启用session
//session config
const sessionConfig = {
    key: 'chloride:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
};
app.keys = ['some secret hurr 2333 333 3 33 ahah'];
app.use(session(sessionConfig, app));

//启用koa-body
// const uploadDirPath = path.resolve(__dirname, '../uploads');
// const bodyParserConfig = {
//
//     multipart: true,
//     formidable: {
//         uploadDir: uploadDirPath,
//         keepExtensions: true
//     }
//
// }

// app.use(bodyParser(bodyParserConfig));



// authentication,加载passport设置
require('./auth')
const passport = require('koa-passport')
app.use(passport.initialize())
app.use(passport.session())
//加载路由设置
const router = require('./router');
app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000);

console.log('server listerning 3000 port')