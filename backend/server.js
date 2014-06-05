var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var port       = process.env.PORT || 8080;
var mongoose   = require('mongoose');
app.use(bodyParser());

mongoose.connect('mongodb://127.0.0.1:27017/test');
var User = require('./models/user');

var router     = express.Router();

// middleware
router.use(function(req, res, next) {
    console.log('Something is happening...');
    next();
});


// basic user API
router.route('/users')
    .post(function(req, res) {
        var user = new User();
        user.name = req.body.name;
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
    })
    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            user.name = req.body.name;
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
app.listen(port);
console.log('Magic is happening on port '+port);
