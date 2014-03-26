'use strict';

// Quizzes routes use quizzes controller
var quizzes = require('../controllers/quizzes');
var authorization = require('./middlewares/authorization');

// Quiz authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.quiz.user.id !== req.user.id) {
        return res.send(401, 'Vous n\'êtes pas aurorisé à faire cette action.');
    }
    next();
};

module.exports = function(app) {

    app.get('/quizzes', quizzes.all);
    app.post('/quizzes', authorization.requiresLogin, quizzes.create);
    app.get('/quizzes/:quizId', quizzes.show);
    app.get('/quizzes/:quizId/questionsnin', quizzes.getQuestionsByIds);
    app.put('/quizzes/:quizId', authorization.requiresLogin, hasAuthorization, quizzes.update);
    app.del('/quizzes/:quizId', authorization.requiresLogin, hasAuthorization, quizzes.destroy);

    // Finish with setting up the quizId param
    app.param('quizId', quizzes.quiz);

};
