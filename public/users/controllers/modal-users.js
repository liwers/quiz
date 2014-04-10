'use strict';

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
angular.module('mean.users').controller('ModalUsersController', ['$scope', '$modalInstance', 'user',
function ($scope, $modalInstance, user) {

    $scope.user = user;

    //convert role string to object
    $scope.roles = [];
    angular.forEach($scope.user.roles, function(role) {
        var newRole = {};
        newRole.value = role;
        $scope.roles.push(newRole);
    });

    $scope.removeRole = function (index) {
        $scope.roles.splice(index, 1);
    };

    $scope.ok = function () {
        //concert role object to string
        var roles = [];
        angular.forEach($scope.roles, function(role) {
            var newRole = '';
            newRole = role.value;
            roles.push(newRole);
        });
        $scope.user.roles = roles;

        $modalInstance.close($scope.user);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
