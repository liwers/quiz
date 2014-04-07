'use strict';

// Limite d'affichage
angular.module('mean.system').directive('searchlimit', function() {
    return {
        restrict: 'E',
        templateUrl: 'public/system/views/limitselect.html'
    };
});
