'use strict';

// Questions routes use questions controller
var questions = require('../controllers/questions');
var authorization = require('./middlewares/authorization');

module.exports = function(app) {

    app.get('/questions', authorization.requiresAdmin, questions.all);
    app.post('/questions', authorization.requiresAdmin, questions.create);
    app.get('/questions/:questionId', authorization.requiresAdmin, questions.show);
    app.put('/questions/:questionId', authorization.requiresAdmin, questions.update);
    app.del('/questions/:questionId', authorization.requiresAdmin, questions.destroy);

    // Finish with setting up the questionId param
    app.param('questionId', questions.question);

};
