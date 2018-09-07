"use strict";
project.directive('pagination', function () {
    return {
        restrict: 'E',
        scope: {
            list: '='
        },
        templateUrl: 'js/directives/pagination/pagination.html',
        link: function (scope, iElement, iAttrs) {
            console.log(scope);
        }
    };
});
