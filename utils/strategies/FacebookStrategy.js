const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('../bcrypt.js');

module.exports = (app, knex) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('facebook', new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `/auth/facebook/callback`,
        profileFields: ['id', 'name', 'emails', 'displayName']
    }, async(accessToken, refreshToken, profile, done) => {
        console.log(profile.id)
        try {
            let usersResult = await knex('users').where({
                facebookid: String(profile.id)
            });
            if (usersResult.length == 0) {
                let user = await knex('users').insert({
                    username: profile.displayName,
                    facebookid: String(profile.id),
                })
                return done(null, user)
            } else {
                // console.log(profile);
                return done(null, usersResult[0]);
            }
        } catch (err) {
            return done(err);
        }
    }));


    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(async(user, done) => {
        done(null, user);

    });
};