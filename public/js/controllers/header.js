'use strict';

app.controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [
      {
        'title': 'Articles',
        'submenu': [
          {
            'title': 'Liste',
            'link': 'articles'
          },
          {
            'title': 'Créer un nouvel article',
            'link': 'articles/create'
          }
        ]
      }
    ];

    $scope.isCollapsed = false;
}]);
