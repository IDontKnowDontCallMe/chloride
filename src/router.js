const Router = require('koa-router');
const passport = require('koa-passport')
const UserController = require('./controller/UserController');

var router = new Router();

router.post('/login',
    function(ctx) {
        //console.log(ctx.request.body)
        ctx.request.body.username = ctx.request.body.fields.username;
        ctx.request.body.password = ctx.request.body.fields.password;

        return passport.authenticate('local', function(err, user, info, status) {
            if(err){
                ctx.body = { message: 'some error!!!' }
            }
            else if (user === false) {
                ctx.body = info;
                //ctx.throw(401)
            } else {
                ctx.body = info;
                return ctx.login(user)
            }
        })(ctx)
    }
);

router.post('/register',
    async function (ctx) {

        let fields = ctx.request.body.fields;

        if(!fields.username || !fields.password){
            ctx.throw(500);
        }

        let result = await UserController.register({username: fields.username, password: fields.password});

        ctx.body = result;

    }
);

router.get('/userInfo/:userId',
    async function (ctx){

        let result = await UserController.getUserById(ctx.params.userId);

        ctx.body = result;

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

router.post('/private/album',
    async function (ctx) {
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
);

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
