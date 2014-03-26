'use strict';

//Questions service used for questions REST endpoint
app.factory('Questions', ['$resource', function($resource) {
    return $resource('questions/:questionId', {
        questionId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
