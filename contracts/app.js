const express = require('express')
const app = express()
const hb = require('express-handlebars')
var bodyParser = require('body-parser');

app.use(express.static('src'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.engine(
    'handlebars',
    hb({
        defaultLayout: 'main'
    })
)
app.set('view engine', 'handlebars')

app.get('/', function(req, res) {
    res.render('index', {
        css: ['home.css']
    })
})

app.get('/checkout', function(req, res) {
    res.render('checkout', {
        css: ['checkout.css'],
        js: ['checkout.js']
    })
})

app.post('/tx', function(req, res) {
    console.log(req.body);
    res.send("Message received");
});

app.listen(8000)