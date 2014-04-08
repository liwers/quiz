'use strict';

angular.module('mean.users').controller('UsersController', ['$scope', '$stateParams', '$location', 'Global', 'Users', 'Alert', function ($scope, $stateParams, $location, Global, Users, Alert) {
    $scope.global = Global;

    $scope.find = function() {
        Users.query(function(users) {
            $scope.users = users;
        });

    };

}]);
