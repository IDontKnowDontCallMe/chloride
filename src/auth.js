const passport = require('koa-passport')

const fetchUser = (() => {
    // This is an example! Use password hashing in your
    const user = { id: 1, username: 'test', password: 'test' }
    return async function() {
        return user
    }
})()

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
    try {
        const user = await fetchUser()
        done(null, user)
    } catch(err) {
        done(err)
    }
})

const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(function(username, password, done) {
    fetchUser()
        .then(user => {
            if (username === user.username && password === user.password) {
                done(null, user)
            } else {
                done(null, false, {message: 'Incorrect password' })
            }
        })
        .catch(err => done(err))
}))

