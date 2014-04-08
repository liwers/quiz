'use strict';

//Setting up route
angular.module('mean.articles').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        //================================================
        // Check if the user is admin
        //================================================
        var checkIsAdmin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/isadmin').success(function(user) {
                // Authenticated
                if (user !== '0')
                    $timeout(deferred.resolve, 0);

                // Not Authenticated
                else {
                    $timeout(function() {
                        deferred.reject();
                    }, 0);
                    $location.url('/');
                }
            });

            return deferred.promise;
        };


        // states for my app
        $stateProvider
            .state('all users', {
                url: '/users',
                templateUrl: 'public/users/views/list.html',
                resolve: {
                    loggedin: checkIsAdmin
                }
            });
    }
]);
