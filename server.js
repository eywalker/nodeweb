var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(session({secret: "ssshhhhh"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var sess;
app.get('/', function(req, res) {
    sess = req.session;
    if(sess.email)
    {
        res.redirect('/admin');
    }
    else {
        res.render('index.html');
    }
});

app.post('/login', function(req, res) {
    var sess = req.session;
    sess.email = req.body.email;
    res.end('done');
});


app.get('/admin', function(req, res) {
    var sess = req.session;
    if (sess.email)
    {
        console.log('Session:', sess.email);
        res.write('<h1>Hello ' + sess.email + '</h1>');
        res.end('<a href="/logout">Logout</a>');
    }
    else
    {
        res.write('<h1>Please login first.<h1>');
        res.end('<a href="/">Login</a>');
    }
});

app.get('/logout', function(req, res) {
    console.log('Destroying')
    req.session.destroy(function(err){
        if(err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
});
app.enable('trust proxy');
app.listen(3000, 127.0.0.1, function() {
    console.log("App strated on PORT 3000");
});
