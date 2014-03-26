'use strict';

//Setting up route
app.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider
        //.when('/test', '/articles')
        .otherwise('/');

    // states for my app
    $stateProvider
        // Quizzes
        .state('all quizzes', {
            url: '/quizzes',
            templateUrl: 'views/quizzes/list.html'
        })
        .state('create quiz', {
            url: '/quizzes/create',
            templateUrl: 'views/quizzes/create.html'
        })
        .state('edit quiz', {
            url: '/quizzes/:quizId/edit',
            templateUrl: 'views/quizzes/edit.html'
        })
        .state('quiz by id', {
            url: '/quizzes/:quizId',
            templateUrl: 'views/quizzes/view.html'
        })
        .state('add questions to quiz', {
            url: '/quizzes/questions/:quizId',
            templateUrl: 'views/quizzes/addquestions.html'
        })

        // Questions
        .state('all questions', {
            url: '/questions',
            templateUrl: 'views/questions/list.html'
        })
        .state('create question', {
            url: '/questions/create',
            templateUrl: 'views/questions/create.html'
        })
        .state('edit question', {
            url: '/questions/:questionId/edit',
            templateUrl: 'views/questions/edit.html'
        })
        .state('question by id', {
            url: '/questions/:questionId',
            templateUrl: 'views/questions/view.html'
        })

        // Users
        .state('all users', {
            url: '/users',
            templateUrl: 'views/users/list.html'
        })

        // Home
        .state('home', {
            url: '/',
            templateUrl: 'views/index.html'
        });
}
]);

//Intercept error 401
app.config(['$httpProvider', '$locationProvider',
    function($httpProvider, $locationProvider) {
        $httpProvider.interceptors.push(['$q', '$location', 'Alert', function($q, $location, Alert) {
            return {
                'responseError': function(response) {
                    switch (response.status) {
                        case 401 :
                            $location.path('/');
                            Alert.add('danger', 'Vous n\'êtes pas autorisé à faire cette action.', 3000);
                            return $q.reject(response);
                            break;
                        case 500 :
                            Alert.add('danger', 'Une erreur est survenue.', 3000);
                            return $q.reject(response);
                            break;
                        default :
                            return $q.reject(response);
                    }
                }
            };
        }]);
    }
]);

//Setting HTML5 Location Mode
app.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
