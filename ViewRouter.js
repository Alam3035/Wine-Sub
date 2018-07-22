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

        router.get('/', (req, res) => {
            res.render('index', {
                css: ['index.css']
            });
        });

        router.get('', (req, res) => {
            res.render('');
        })
    }
}