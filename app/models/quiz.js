'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Quizz Schema
 */
var QuizSchema = new Schema(
    {
        title: {
            type: String,
            trim: true
        },
        description: String,
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        questions: [{
                type: Schema.ObjectId,
                ref: 'Question'
            }]
        });

/**
 * Validations
 */
QuizSchema.path('title').validate(function(title) {
    return title.length;
}, 'Le titre ne peut être vide');

/**
 * Statics
 */
QuizSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').populate('question').exec(cb);
};

mongoose.model('Quiz', QuizSchema);
