'use strict';

// Quizzes routes use quizzes controller
var quizzes = require('../controllers/quizzes');
var authorization = require('./middlewares/authorization');

module.exports = function(app) {

    app.get('/quizzes', quizzes.all);
    app.post('/quizzes', authorization.requiresLogin, quizzes.create);
    app.get('/quizzes/:quizId', quizzes.show);
    app.get('/quizzes/:quizId/questionsnin', quizzes.getQuestionsByIds);
    app.put('/quizzes/:quizId', authorization.requiresLogin, quizzes.update);
    app.del('/quizzes/:quizId', authorization.requiresLogin, quizzes.destroy);

    // Finish with setting up the quizId param
    app.param('quizId', quizzes.quiz);

};
