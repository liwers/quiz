'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Quiz = mongoose.model('Quiz'),
    Question = mongoose.model('Question'),
    _ = require('lodash');


/**
 * Find quiz by id
 */
exports.quiz = function(req, res, next, id) {
    Quiz.load(id, function(err, quiz) {
        if (err) {
            return res.send(500, err);
        }
        if (!quiz) {
            return next(new Error('Erreur de chargement du quiz ' + id));
        }
        req.quiz = quiz;
        next();
    });
};

/**
 * Create a quiz
 */
exports.create = function(req, res) {
    var quiz = new Quiz(req.body);
    quiz.user = req.user;

    quiz.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                quiz: quiz
            });
        } else {
            res.jsonp(quiz);
        }
    });
};

/**
 * Update a quiz
 */
exports.update = function(req, res) {
    var quiz = req.quiz;
    quiz = _.extend(quiz, req.body);
    quiz.save(function(err) {
        if (err) {
            return res.send(500, err);
        } else {
            Quiz.load(quiz, function(err, quiz) {
                if (err || !quiz) {
                    return res.send(500, err);
                }
                if (!quiz) {
                    return res.send(500, 'Erreur de chargement du quiz ' + quiz);
                }
                res.jsonp(quiz);
            });
        }
    });
};

/**
 * Delete a quiz
 */
exports.destroy = function(req, res) {
    var quiz = req.quiz;

    quiz.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                quiz: quiz
            });
        } else {
            res.jsonp(quiz);
        }
    });
};

/**
 * Show a quiz
 */
exports.show = function(req, res) {
    res.jsonp(req.quiz);
};

/**
 * List of quizzes
 */
exports.all = function(req, res) {
    Quiz.find().sort('-created').populate('user', 'name username').exec(function(err, quizzes) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(quizzes);
        }
    });
};

/**
 * List of questions NOT in quiz
*/
exports.getQuestionsByIds = function(req, res) {
    var quiz = req.quiz;
    var questionIds = [];

    Quiz.loadQuestionsId(quiz, function(err, quiz) {
        if (err || !quiz) {
            return res.send(500, err);
        }
        if (!quiz) {
            return res.send(500, 'Erreur de chargement du quiz ' + quiz);
        }
        questionIds = quiz.questions;

        Question.find({'_id': { $nin: questionIds}}).exec(function(err, questions) {
            if (err) {
                return res.send(500, err);
            } else {
                res.jsonp(questions);
            }
        });
    });
};
