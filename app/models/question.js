'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Question Schema
 */
var QuestionSchema = new Schema({
    question: String,
    type: {
        type: String,
        default: 'text'
    },
    answers: [{
        answer: String,
        isCorrect: Boolean
    }],
    file: String,
    tags: [String]
});

/**
 * Statics
 */
QuestionSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};


mongoose.model('Question', QuestionSchema);
