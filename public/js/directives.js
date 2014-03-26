'use strict';

// Sous menu
app.directive('menuItem', function ($compile) {

    var getTemplate = function(item) {
        var template = '';

        if (item.submenu) {
          template = '<a href="#" class="dropdown-toggle" data-toggle="dropdown">{{item.title}}</a>';
          template += '<ul class="dropdown-menu" data-ng-show="item.submenu">';
          var len = item.submenu.length;
          for (var i = 0; i < len; i++) {
            template += '<li><a href="#!/{{item.submenu['+ i +'].link}}">{{item.submenu['+ i +'].title}}</a></li>';
          }
          template += '</ul>';
        }
        else {
          template = '<a href="#!/{{item.link}}">{{item.title}}</a>';
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

// Limite d'affichage
app.directive('searchlimit', function() {
    return {
      restrict: "E",
      templateUrl: "views/common/limitselect.html"
    };
});
