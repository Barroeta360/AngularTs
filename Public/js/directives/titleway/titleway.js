"use strict";
project.directive('titleWay', function () {
    return {
        restrict: 'E',
        scope: {
            content: '@'
        },
        templateUrl: 'js/directives/titleway/titleway.html',
        link: function (scope, iElement, iAttrs) {
            console.log(scope);
        }
    };
});
