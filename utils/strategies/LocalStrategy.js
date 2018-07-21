const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('../bcrypt')

module.exports = (passport, knex) => {

    passport.use('local-login', new LocalStrategy(
        (email, password, done) => {

            let getUsers = knex.select('*').from('users').where('username', email);
            getUsers
                .then((user) => {
                    user = user[0];
                    if (user == null) {
                        console.log('incorrect username: ', email);
                        return done(null, false, {
                            message: 'Incorrect credentials.'
                        })
                    } else {
                        bcrypt.checkPassword(password, user.password)
                            .then(result => {
                                if (result) {
                                    return done(null, user);
                                } else {
                                    return done(null, false, {
                                        message: 'Incorrect credentials'
                                    });
                                }
                            })
                            .catch(err => {
                                return done(err);
                            });
                    }
                })
        }));
    passport.use('local-signup', new LocalStrategy(
        (email, password, done) => {
            // [REVIEW] Use Transaction
            let getUsers = knex.select('*').from('users').where('username', email);
            getUsers
                .then((user) => {
                    user = user[0];
                    if (user) {
                        return done(null, false, {
                            message: 'Email already taken',
                            signupForm: "show"
                        });
                    } else {
                        bcrypt.hashPassword(password)
                            .then(hash => {
                                const newUser = {
                                    username: email,
                                    password: hash
                                };
                                knex.insert(newUser).into('users')
                                    .then(function(result) {
                                        console.log(result);
                                    })
                                done(null, newUser);
                            })
                            .catch(err => console.log(err));
                    }
                })
        }));
};