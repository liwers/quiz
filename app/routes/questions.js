'use strict';

// Questions routes use questions controller
var questions = require('../controllers/questions');
var authorization = require('./middlewares/authorization');

module.exports = function(app) {

    app.get('/questions', questions.all);
    app.post('/questions', authorization.requiresLogin, questions.create);
    app.get('/questions/:questionId', questions.show);
    app.put('/questions/:questionId', authorization.requiresLogin, questions.update);
    app.del('/questions/:questionId', authorization.requiresLogin, questions.destroy);

    // Finish with setting up the questionId param
    app.param('questionId', questions.question);

};
