const express = require('express')
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: false
})
const isLoggedIn = require('./utils/guard').isLoggedIn;

module.exports = class ViewRouter {

    constructor(knex, io) {
        this.knex = knex;
        this.io = io;
    }

    router() {
        const router = express.Router();

        router.get('/', function(req, res) {
            res.render('index', {
                css: ['home.css']
            })
        })

        router.get('/login', (req, res) => {
            res.render('login', {
                css: ['res-log.css']
            })
        })

        router.post('/login', passport.authenticate('local-login', {
            successRedirect: '/customer-backend',
            failureRedirect: '/error'
        }));

        router.get('/error', (req, res) => {
            res.send('You are not Logged in!!!')
        })

        router.get("/auth/facebook", passport.authenticate('facebook', {
            scope: ['user_friends', 'manage_pages']
        }));

        router.get("/auth/facebook/callback", passport.authenticate('facebook', {
            successRedirect: "/customer-backend",
            failureRedirect: "/"
        }), (req, res) => res.redirect('/customer-backend'));

        router.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/questionnaire',
            failureRedirect: '/error'
        }));

        router.get('/subscription', function(req, res) {
            res.render('subscription', {
                css: ['sub.css']
            })
        })

        router.get('/quiz-result', function(req, res) {
            res.render('qr', {
                css: ['qr.css']
            })
        })

        router.get('/change-pw', (req, res) => {
            res.render('change-pw', {
                css: ['pw.css']
            })
        })

        router.get('/checkout', (req, res) => {
            res.render('checkout', {
                css: ['checkout.css']
            })
        })

        router.get('/done', (req, res) => {
            res.render('done', {
                css: ['done.css']
            })
        })

        router.get('/customer-backend', (req, res) => {
            res.render('back', {
                css: ['back.css']
            })
        })

        router.get('/questionnaire', function(req, res) {
            res.render('questionnaire', {
                css: ['ques.css']
            })
        })

        return router;
    }
}