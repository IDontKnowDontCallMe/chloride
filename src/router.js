const Router = require('koa-router');
const passport = require('koa-passport')
var userController = require('./controller/UserSimpleController');

var router = new Router();

router.post('/login',
    function(ctx) {
        return passport.authenticate('local', function(err, user, info, status) {
            if(err){
                ctx.body = { message: 'some error!!!' }
            }
            if (user === false) {
                ctx.body = { message: 'password error or user dosent exsit' }
                //ctx.throw(401)
            } else {
                ctx.body = { message: 'login success', userId: user.id }
                return ctx.login(user)
            }
        })(ctx)
    }
);


router.get('/',
    ctx =>{
        ctx.body = {message: 'this is a public homepage'};
    }
);


//设置非公共接口访问前需要验证
router.use('/private',function(ctx, next) {
    if (ctx.isAuthenticated()) {
        return next()
    } else {
        ctx.throw(401);
    }
})

router.post('/private/image',
    ctx => {
        console.log(ctx.request.body.fields);
        // => {username: ""} - if empty

        console.log(ctx.request.body.files);
        /* => {uploads: [
                {
                  "size": 748831,
                  "path": "/tmp/f7777b4269bf6e64518f96248537c0ab.png",
                  "name": "some-image.png",
                  "type": "image/png",
                  "mtime": "2014-06-17T11:08:52.816Z"
                },
                {
                  "size": 379749,
                  "path": "/tmp/83b8cf0524529482d2f8b5d0852f49bf.jpeg",
                  "name": "nodejs_rulz.jpeg",
                  "type": "image/jpeg",
                  "mtime": "2014-06-17T11:08:52.830Z"
                }
              ]}
        */
        ctx.body = JSON.stringify(ctx.request.body, null, 2)
    }
)



router.get('/private/getUser',
    ctx =>{
        ctx.body = {user: 'Jack'};
    }
);


module.exports = router;
