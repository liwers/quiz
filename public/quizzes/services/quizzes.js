'use strict';

//Quizzes service used for quizzes REST endpoint
angular.module('mean.quizzes').factory('Quizzes', ['$resource', function($resource) {
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
