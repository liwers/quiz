'use strict';

app.controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    //menu pour utilisateur non authentifé
    var menuAll  = [
        {
            'title': 'Quiz',
            'link': 'quizzes'
        }
    ];

    //menu pour utilisateur authentié
    var menuUser = [
        {
            'title': 'Utilisateurs',
            'link': 'users'
        },
        {
            'title': 'Quiz',
            'submenu': [
                {
                    'title': 'Liste',
                    'link': 'quizzes'
                },
                {
                    'title': 'Créer un nouvel quiz',
                    'link': 'quizzes/create'
                }
            ]
        },
        {
            'title': 'Questions',
            'submenu': [
                {
                    'title': 'Liste',
                    'link': 'questions'
                },
                {
                    'title': 'Créer une nouvelle question',
                    'link': 'questions/create'
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
