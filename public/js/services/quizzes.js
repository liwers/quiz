'use strict';

//Quizzes service used for quizzes REST endpoint
app.factory('Quizzes', ['$resource', function($resource) {
    return $resource('Quizzes/:quizId', {
        quizId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
