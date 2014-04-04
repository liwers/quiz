'use strict';

angular.module('mean-factory-interceptor',[])
    .factory('httpInterceptor', ['$q','$location','Alert',function ($q,$location,Alert) {
        return {
            'response': function(response) {
                if (response.status === 401) {
                    Alert.add('danger', 'Vous n\'êtes pas autorisé à faire cette action.', 3000);
                    $location.path('/login');
                    return $q.reject(response);
                }
                if (response.status === 500) {
                    Alert.add('danger', 'Une erreur est survenue.', 3000);
                    return $q.reject(response);
                }
                return response || $q.when(response);
            },

            'responseError': function(rejection) {
                if (rejection.status === 401) {
                    Alert.add('danger', 'Vous n\'êtes pas autorisé à faire cette action.', 3000);
                    $location.url('/login');
                    return $q.reject(rejection);
                }
                if (response.status === 500) {
                    Alert.add('danger', 'Une erreur est survenue.', 3000);
                    return $q.reject(rejection);
                }
                return $q.reject(rejection);
            }

        };
    }
    ])
//Http Intercpetor to check auth failures for xhr requests
    .config(['$httpProvider',function($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    }]);
