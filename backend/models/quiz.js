var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var QuizSchema = new Schema({
    title    : String,
    question : String
});

module.exports = mongoose.model('quiz', QuizSchema);
