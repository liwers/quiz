'use strict';

//Users service used for user REST endpoint
angular.module('mean.users').factory('Users', ['$resource', function($resource) {
    return $resource('users');
}]);
