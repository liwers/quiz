'use strict';

app.controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    //menu pour utilisateur non authentifé
    var menuAll  = [
      {
        'title': 'Articles',
        'link': 'articles'
      }
    ];

    //menu pour utilisateur authentié
    var menuUser = [
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

    switch (Global.authenticated) {
        case true:
            $scope.menu = menuUser;
            break;
        default:
            $scope.menu= menuAll;
            break;
    }

    $scope.isCollapsed = false;
}]);
