var express = require('express');
var User    = require('../models/user');

module.exports = function(app) {
    var router  = express.Router();
    router.route('/users')
        .post(function(req, res) {
            var user = new User();
            user.name = req.body.user.name;
            user.save(function(err) {
                if (err)
                res.send(err);
            res.json(201, {user: user});
            });
        })
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
            res.send(err);
        res.json({ users: users });
        });
    });

    router.route('/users/:user_id')
        .get(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {
                if (err)
                res.send(err);
            res.json({user: user});
            });
        })
    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
            res.send(err);
        user.name = req.body.user.name;
        user.save(function(err) {
            if (err)
            res.send(err);
        res.json(201, {user: user});
        });
        });
    })
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
            res.send(err);
        res.json(204, {});
        });
    });

    app.use('/api/v1', router);
};
