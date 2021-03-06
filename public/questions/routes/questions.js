'use strict';

//Setting up route
angular.module('mean.questions').config(['$stateProvider', '$urlRouterProvider',
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
            .state('all questions', {
                url: '/questions',
                templateUrl: 'public/questions/views/list.html',
                resolve: {
                    loggedin: checkIsAdmin
                }
            })
            .state('create question', {
                url: '/questions/create',
                templateUrl: 'public/questions/views/create.html',
                resolve: {
                    loggedin: checkIsAdmin
                }
            })
            .state('edit question', {
                url: '/questions/:questionId/edit',
                templateUrl: 'public/questions/views/edit.html',
                resolve: {
                    loggedin: checkIsAdmin
                }
            })
            .state('question by id', {
                url: '/questions/:questionId',
                templateUrl: 'public/questions/views/view.html',
                resolve: {
                    loggedin: checkIsAdmin
                }
            });
    }
]);
