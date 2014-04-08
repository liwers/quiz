'use strict';

// Quizzes routes use quizzes controller
var quizzes = require('../controllers/quizzes');
var authorization = require('./middlewares/authorization');

module.exports = function(app) {

    app.get('/quizzes', authorization.requiresAdmin, quizzes.all);
    app.post('/quizzes', authorization.requiresAdmin, quizzes.create);
    app.get('/quizzes/:quizId', authorization.requiresAdmin, quizzes.show);
    app.get('/quizzes/:quizId/questionsnin', authorization.requiresAdmin, quizzes.getQuestionsByIds);
    app.put('/quizzes/:quizId', authorization.requiresAdmin, quizzes.update);
    app.del('/quizzes/:quizId', authorization.requiresAdmin, quizzes.destroy);

    // Finish with setting up the quizId param
    app.param('quizId', quizzes.quiz);

};
