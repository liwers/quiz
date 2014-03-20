'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Quiz = mongoose.model('Quiz'),
    _ = require('lodash');


/**
 * Find quiz by id
 */
exports.quiz = function(req, res, next, id) {
    Quiz.load(id, function(err, quiz) {
        if (err) return next(err);
        if (!quiz) return next(new Error('Erreur de chargement du quiz ' + id));
        req.quiz = quiz;
        next();
    });
};

/**
 * Create an quiz
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
 * Update an quiz
 */
exports.update = function(req, res) {
    var quiz = req.quiz;

    quiz = _.extend(quiz, req.body);

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
 * Delete an quiz
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
 * Show an quiz
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
