var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const hb = require('express-handlebars')

app.use(express.static('../src'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.engine('handlebars', hb({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.get('/tx', function(req, res) {
    console.log(req)
    res.render('/views/index.handlebars');
});

app.post('/tx', function(req, res) {
    console.log(req.body);
    res.send("Message received");
});

app.post('/login', function(req, res) {
    console.log(req.path);
    res.send('post received');
});

app.listen(8000);