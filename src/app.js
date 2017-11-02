const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-body');
const session = require('koa-session');

//init the database config, run the code only
var db = require('./model/index');
db.sequelize.sync({force: false}).then(function() {
    console.log("Database successed to init");
}).catch(function(err){
    console.log("Database failed to start due to error: %s", err);
});





const app = new Koa();

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
const uploadDirPath = path.resolve(__dirname, '../uploads');
const bodyParserConfig = {

    multipart: true,
    formidable: {
        uploadDir: uploadDirPath,
        keepExtensions: true
    }

}

app.use(bodyParser(bodyParserConfig));

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