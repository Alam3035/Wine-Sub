const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

module.exports = (passport, knex) => {
    passport.use('facebook', new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `/auth/facebook/callback`
    }, (accessToken, refreshToken, users, done) => {
        console.log(users);
        let getUsers = knex.select('*').from('users').where('facebook_id', users.id);

        getUsers
            .then((user) => {

                if (user[0] != undefined) {
                    return done(null, user[0]);
                } else if (user[0] == undefined) {
                    users.id = users.id.toString();
                    knex.insert({
                        facebook_id: users.id,
                        display_name: users.displayName,
                    }).into('users').then(() => {
                        knex.select('*').from('users').where('facebook_id', users.id)
                            .then(loginUser => {
                                console.log('new user: ', loginUser[0]);
                                return done(null, loginUser[0]);
                            })
                    });
                } else {
                    return done(null, false, {
                        message: 'An error has occurred. Please try to log in again'
                    });
                }
            })
    }));
}