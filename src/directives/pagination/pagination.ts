project.directive('pagination', function () {
    return {
        restrict: 'E',
        scope : {
            list: '='
        },
        templateUrl: 'js/directives/pagination/pagination.html',
        link: function (scope:any, iElement:any, iAttrs:any) {
            console.log(scope);
        }
    }
});