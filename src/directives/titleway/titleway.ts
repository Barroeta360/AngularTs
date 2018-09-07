project.directive('titleWay', function () {
    return {
        restrict: 'E',
        scope : {
            content: '@'
        },
        templateUrl: 'js/directives/titleway/titleway.html',
        link: function (scope:any, iElement:any, iAttrs:any) {
            console.log(scope);
        }
    }
});