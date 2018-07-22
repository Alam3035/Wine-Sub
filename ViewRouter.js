const express = require('express')
const passport = require('passport')
const session = require('express-session')
const expressValidator = require('express-validator')

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

class ViewRouter {
    constructor(knex, io) {
        this.knex = knex;
        this.io = io;
    }
    router() {
        const router = express.Router();

        // Flash message middleware
        router.use(session({
            secret: 'Secret',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false,
            }, // change this to true when using https
        }));

        router.use(expressValidator());

        // Validator
        router.use((req, res, next) => {
            res.locals.success_message = req.flash('success_message');
            res.locals.error_message = req.flash('error_message');
            res.locals.error = req.flash('error');
            res.locals.user = req.user || null;
            next();
        });

        router.get('/', function(req, res) {
            res.render('index', {
                css: ['home.css']
            })
        })

        router.get('/login', function(req, res) {
            res.render('login', {
                css: ['res-log.css']
            })
        })

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

        router.get('/change-pw', function(req, res) {
            res.render('change-pw', {
                css: ['pw.css']
            })
        })

        router.get('/checkout', function(req, res) {
            res.render('checkout', {
                css: ['checkout.css']
            })
        })

        router.get('/done', function(req, res) {
            res.render('done', {
                css: ['done.css']
            })
        })

        router.get('/customer-backend', function(req, res) {
            res.render('back', {
                css: ['back.css']
            })
        })

        router.get('/questionnaire', function(req, res) {
            res.render('questionnaire', {
                css: ['ques.css']
            })
        })
    }
}