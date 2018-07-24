const express = require("express");
const passport = require('passport');
const isLoggedIn = require('./utils/guard').isLoggedIn;

module.exports = class ViewRouter {

    router(knex) {
        let router = express.Router();

        //error handle
        router.use(function(err, req, res, next) {
            res.status(500).send("Something failded." + err);
        });

        // Hompage
        router.get('/', function(req, res) {
            res.render('index');
            console.log(req.user)
        });

        // Login
        router.get('/login', function(req, res) {
            res.render('login');
        });

        router.post('/login', passport.authenticate('local-login', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));

        //Login with facebook
        router.get('/auth/facebook',
            passport.authenticate('facebook', {
                scope: ['user_location', 'email']
            })
        );

        // handle control to passport to use code to grab profile info
        router.get('/auth/facebook/callback', passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/error',
            session: true
        }));

        // Signup
        router.get('/signup', (req, res) => {
            res.render('signup');
        });

        router.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/questionnaire',
            failureRedirect: '/error'
        }));

        // Logout
        router.get('/logout', isLoggedIn, function(req, res) {
            req.logout();
            res.redirect('/login');
        });

        // Signup error
        router.get('/error', (req, res) => {
            res.send('You are not logged in!');
        });

        // Questionnaire
        router.get('/questionnaire', isLoggedIn, function(req, res) {
            res.render('questionnaire');
        });

        // Questionnaire-Result
        router.get('/qr', isLoggedIn, function(req, res) {
            res.render('qr');
        });

        // Subscription
        router.get('/subscription', isLoggedIn, function(req, res) {
            res.render('subscription');
        });

        // Checkout
        router.get('/checkout', function(req, res) {
            res.render('checkout');
        })

        // Transaction
        router.post('/tx', function(req, res) {
            console.log(req.body);
            res.send('Message received');
            knex('order').insert({txid: req.body}).then(function () {
            });
        })

        // Change Password
        router.get('/change-pw', isLoggedIn, function(req, res) {
            res.render('change-pw');
        })

        // Customer-Backend
        router.get('/customer-backend', isLoggedIn, function(req, res) {
            res.render('customer-backend');
        })

        return router;
    }
}