var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var port       = process.env.PORT || 8080;
var globSync   = require('glob').sync;
var routes     = globSync('./routes/*.js', { cwd: __dirname}).map(require);
var mongoose   = require('mongoose');

app.use(bodyParser());

mongoose.connect('mongodb://127.0.0.1:27017/test');

routes.forEach(function(route) { route(app); });

app.listen(port);
console.log('Magic is happening on port '+port);
