const express = require('express');
const bodyParser = require('body-parser');
const hb = require('express-handlebars');

module.exports = (knex) => {
    let app = express();
    let server = require('http').Server(app);

    app.engine('handlebars', hb({
        defaultLayout: 'main'
    }));
    app.set('view engine', 'handlebars');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(fileUpload());

    require('./passport')(app, knex);

}