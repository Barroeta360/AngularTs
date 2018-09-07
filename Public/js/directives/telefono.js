"use strict";
project.directive('telefono', function () {
    return {
        restrict: 'A',
        scope: {
            number: '=',
            ladda: '=',
            callback: '='
        },
        link: function ($scope, iElement, iAttrs) {
            console.log($scope);
            console.log(iElement);
            console.log(iAttrs);
            iElement.on("change", function (e) {
                console.log('element');
                console.log($scope.number);
            });
        }
    };
});
