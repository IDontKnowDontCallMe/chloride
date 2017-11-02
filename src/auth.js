const passport = require('koa-passport')

const UserService = require('./service/UserService')

// const fetchUser = (() => {
//     // This is an example! Use password hashing in your
//     const user = { id: 1, username: 'test', password: 'test' }
//     return async function() {
//         return user
//     }
// })()

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
    try {
        const user = await UserService.getUserById(id);
        done(null, user)
    } catch(err) {
        done(err)
    }
})

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
    function(username, password, done) {

        UserService.verifyPassword({username:username, password:password})
            .then(result => {
                if (result.message==='success') {
                    done(null, result.user, result)
                } else {
                    done(null, false, result)
                }
            })
            .catch(err => {console.log(err); done(err)})
}))

