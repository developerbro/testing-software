var express           = require('express');
var app               = express();
var bodyParser        = require('body-parser');
var port              = process.env.PORT || 8080;
var globSync          = require('glob').sync;
var routes            = globSync('./routes/*.js', { cwd: __dirname}).map(require);
var mongoose          = require('mongoose');
var passport          = require('passport');
var EmberAuthStrategy = require('passport-ember-auth').Strategy;

mongoose.connect('mongodb://127.0.0.1:27017/test');

var User = require('./models/user');
function findByToken(token, fn) {
    User.findOne({token: token}, function(err, user) {
        if (err)
            return fn(null, null);
        return fn(null, user);
    });
}
app.use(bodyParser());
app.disable('etag');
app.use(passport.initialize());
passport.use(new EmberAuthStrategy({}, function(token, done) {
    process.nextTick(function() {
        findByToken(token, function(err, user) {
            if (err) return done(err);
            if (!user) return done(null, false);
            return done(null, user);
        });
    });
}));

routes.forEach(function(route) { route(app); });

app.listen(port);
console.log('Magic is happening on port '+port);
