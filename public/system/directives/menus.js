'use strict';

// Sous menu
angular.module('mean.system').directive('menuItem', function ($compile) {

    var getTemplate = function(item) {
        var template = '';

        if (item.submenu) {
            template = '<a href="#" class="dropdown-toggle" data-toggle="dropdown">{{item.title}}</a>';
            template += '<ul class="dropdown-menu" data-ng-show="item.submenu">';
            angular.forEach(item.submenu, function(item) {
                template += '<li><a mean-token="item.link" ui-sref="' + item.link + '">' + item.title + '</a></li>';
            });
            template += '</ul>';
        }
        else {
            template = '<a mean-token="item.link" ui-sref="' + item.link + '">' + item.title + '</a>';
        }

        return template;
    };

    var linker = function(scope, element, attrs) {
        element.html(getTemplate(scope.item));

        $compile(element.contents())(scope);
    };

    return {
        restrict: 'A',
        link: linker,
        scope: {
            item:'=menuItem'
        }
    };
});
