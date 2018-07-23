const passport = require('passport');
const flash = require('connect-flash');
const knex = require('knex');

module.exports = (app, knex) => {
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    require('./strategies/LocalStrategy')(passport, knex);
    require('./strategies/FacebookStrategy')(passport, knex);

}