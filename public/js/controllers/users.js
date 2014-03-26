'use strict';

app.controller('UsersController', ['$scope', '$stateParams', '$location', 'Global', 'Users', 'Alert', function ($scope, $stateParams, $location, Global, Users, Alert) {
    $scope.global = Global;
    $scope.roles = ['admin', 'user', 'player'];

    $scope.find = function() {
        Users.query(function(users) {
            $scope.users = users;
        });

    };

    $scope.remove = function(user) {
        if (user) {
            user.$remove();

            for (var i in $scope.users) {
                if ($scope.users[i] === user) {
                    $scope.users.splice(i, 1);
                }
            }
        }
        else {
            $scope.user.$remove();
        }
    };

    $scope.update = function() {
        var user = $scope.user;
        if (!user.updated) {
            user.updated = [];
        }
        user.updated.push(new Date().getTime());

        user.$update(function() {
            Alert.add('info', 'L\'utilisateur ' + user.username + ' a été mis à jour.', 2000);
        });
    };

}]);
