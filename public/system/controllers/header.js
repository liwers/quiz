'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', 'Global', 'Menus',
    function($scope, $rootScope, Global, Menus) {
        $scope.global = Global;
        $scope.menus = {};

        // Default hard coded menu items for main menu
        var defaultMainMenu = [
            {
                'roles': ['authenticated'],
                'title': 'Articles',
                'submenu': [
                    {
                        'title': 'Liste',
                        'link': 'all articles'
                    },
                    {
                        'title': 'Créer un nouvel article',
                        'link': 'create article'
                    }
                ]
            },
            {
                'roles': ['admin'],
                'title': 'Quiz',
                'submenu': [
                    {
                        'title': 'Liste',
                        'link': 'all quizzes'
                    },
                    {
                        'title': 'Créer un nouveau quiz',
                        'link': 'create quiz'
                    }
                ]
            },
            {
                'roles': ['admin'],
                'title': 'Questions',
                'submenu': [
                    {
                        'title': 'Liste',
                        'link': 'all questions'
                    },
                    {
                        'title': 'Créer une nouvelle question',
                        'link': 'create question'
                    }
                ]
            },
            {
                'roles': ['admin'],
                'title': 'Utilisateurs',
                'link': 'all users'
            }
        ];

        // Query menus added by modules. Only returns menus that user is allowed to see.
        function queryMenu(name, defaultMenu) {

            Menus.query({
                name: name,
                defaultMenu: defaultMenu
            }, function(menu) {
                $scope.menus[name] = menu;
            });
        }

        // Query server for menus and check permissions
        queryMenu('main', defaultMainMenu);

        $scope.isCollapsed = false;

        $rootScope.$on('loggedin', function() {

            queryMenu('main', defaultMainMenu);

            $scope.global = {
                authenticated: !! $rootScope.user,
                user: $rootScope.user
            };
        });

    }
]);
