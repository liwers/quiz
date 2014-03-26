'use strict';

//Quizzes service used for quizzes REST endpoint
app.factory('Quizzes', ['$resource', function($resource) {
    return $resource('quizzes/:quizId/:dest', {quizId: '@_id'}, {
        update: {
            method: 'PUT'
        },
        getQuestionsNin: {
            method: 'GET',
            params: {dest:"questionsnin"},
            isArray: true
        }
    });
}]);
