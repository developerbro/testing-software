var express  = require('express');
var Quiz     = require('../models/quiz');
var passport = require('passport');

module.exports = function(app) {
    var router  = express.Router();
    router.route('/quizzes')
        .post(passport.authenticate('EmberAuth', {session: false}),
                function(req, res) {
                    var quiz = new Quiz();
                    quiz.title    = req.body.quiz.title;
                    quiz.question = req.body.quiz.question;
                    quiz.save(function(err) {
                        if (err)
                        res.send(err);
                    res.json(201, {quiz: quiz});
                    });
                })
    .get(passport.authenticate('EmberAuth', {session: false}), 
            function(req, res) {
                Quiz.find(function(err, quizzes) {
                    if (err)
                    res.send(err);
                res.json({ quizzes: quizzes });
                });
            });

    router.route('/quizzes/:quiz_id')
        .get(passport.authenticate('EmberAuth', {session: false}),
                function(req, res) {
                    Quiz.findById(req.params.quiz_id, function(err, quiz) {
                        if (err) res.send(err);
                        res.json({quiz: quiz});
                    });
                })
    .put(passport.authenticate('EmberAuth', {session: false}),
            function(req, res) {
                Quiz.findById(req.params.quiz_id, function(err, quiz) {
                    if (err) res.send(err);
                    quiz.title    = req.body.quiz.title;
                    quiz.question = req.body.quiz.question;
                    quiz.save(function(err) {
                        if (err) res.send(err);
                        res.json(201, {quiz: quiz});
                    });
                });
            })
    .delete(passport.authenticate('EmberAuth', {session: false}),
            function(req, res) {
                Quiz.remove({
                    _id: req.params.quiz_id
                }, function(err, quiz) {
                    if (err)
                    res.send(err);
                res.json(204, {});
                });
            });

    app.use('/api/v1', router);
};
