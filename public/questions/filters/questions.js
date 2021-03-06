'use strict';

angular.module('mean.questions').filter('truncate', function(){
    return function(text, length){
        if (text) {
            var ellipsis = text.length > length ? '...' : '';
            return text.slice(0, length) + ellipsis;
        }
        return text;
    };
});

angular.module('mean.questions').filter('getValueKind', function(){
    return function(id, kinds){
        if (id) {
            var i=0, len=kinds.length;
            for (; i<len; i++) {
                if (kinds[i].id === id) {
                    return kinds[i].value;
                }
            }
        }
        return id;
    };
});
