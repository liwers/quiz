'use strict';

angular.module('mean.users').controller('UsersController', ['$scope', '$stateParams', '$location', 'Global', 'Users', 'Alert', '$modal', function ($scope, $stateParams, $location, Global, Users, Alert, $modal) {
    $scope.global = Global;

    $scope.find = function() {
        Users.query(function(users) {
            $scope.users = users;
        });

    };


    $scope.open = function (index) {

        var user = $scope.users[index];

        var modalInstance = $modal.open({
            templateUrl: 'public/users/views/modal-edit.html',
            controller: 'ModalUsersController',
            resolve: {
                user: function () {
                    return user;
                }
            }
        });

        modalInstance.result.then(function (user) {
            //OK
            user.$save(function(user) {
                Alert.add('success', user.username  + ' a été correctement modifié', 3000);
            });
        }, function () {
            //Cancel
        });
    };

}]);
