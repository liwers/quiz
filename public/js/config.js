'use strict';

//Setting up route
app.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider
        .when('/test', '/articles')
        .otherwise('/');

    // states for my app
    $stateProvider
      .state('all articles', {
        url: '/articles',
        templateUrl: 'views/articles/list.html'
    })
      .state('create article', {
        url: '/articles/create',
        templateUrl: 'views/articles/create.html'
    })
      .state('edit article', {
        url: '/articles/:articleId/edit',
        templateUrl: 'views/articles/edit.html'
    })
      .state('article by id', {
        url: '/articles/:articleId',
        templateUrl: 'views/articles/view.html'
    })
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
                    if(response.status === 401) {
                        $location.path('/');
                        Alert.add('danger', 'Vous n\'êtes pas autorisé à faire cette action.', 3000);
                        return $q.reject(response);
                    }
                    else {
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
