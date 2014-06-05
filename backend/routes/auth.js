var crypto  = require('crypto');
var express = require('express');
var User    = require('../models/user');

module.exports = function(app) {
    var router  = express.Router();
    router.post('/auth', function(req, res) {
        User.findOne({token: req.body.token}, function(err, user) {
            if (err) res.send(err);
            user.password = '';
            res.send(user);
        });
    });
    router.post('/auth/login', function(req, res) {
       var u = req.body; 
       var passHash = crypto.createHash('md5').update(u.password).digest('hex');
       User.findOne({username: u.username, password: passHash}, function(err, user) {
           if (err) res.send(err);
           if (user) {
               user.token = crypto.randomBytes(20).toString('hex');
               user.save();
           }
           res.send(user);
       });
    }); 
    router.post('/auth/register', function(req, res) {
        var u = req.body;
        var user = new User({
            username : u.username,
            email    : u.useremail,
            password : crypto.createHash('md5').update(u.userpass).digest('hex'),
            token    : crypto.randomBytes(20).toString('hex')
        });
        user.save(function(err, user) {
            if (err) res.send(err);
            res.send(201, "");
        });
    });

    app.use('/api/v1', router);
};
