'use strict';

//Setting up route
angular.module('mean.quizzes').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        //================================================
        // Check if the user is connected
        //================================================
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0')
                    $timeout(deferred.resolve, 0);

                // Not Authenticated
                else {
                    $timeout(function() {
                        deferred.reject();
                    }, 0);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };


        // states for my app
        $stateProvider
            .state('all quizzes', {
                url: '/quizzes',
                templateUrl: 'public/quizzes/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create quiz', {
                url: '/quizzes/create',
                templateUrl: 'public/quizzes/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit quiz', {
                url: '/quizzes/:quizId/edit',
                templateUrl: 'public/quizzes/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('quiz by id', {
                url: '/quizzes/:quizId',
                templateUrl: 'public/quizzes/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('add questions to quiz', {
                url: '/quizzes/questions/:quizId',
                templateUrl: 'public/quizzes/views/addquestions.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
