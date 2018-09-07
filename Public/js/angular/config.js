"use strict";
project.config(function (cfpLoadingBarProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    $stateProvider
        .state('home', {
        url: '/home',
        templateUrl: 'includes/home.html',
        title: 'Home',
        resolve: load([
            'js/controllers/index.controller.js',
        ])
    })
        .state('login', {
        url: '/login',
        templateUrl: 'includes/login.html',
        resolve: load([
            'js/controllers/login.controller.js'
        ])
    });
    $urlRouterProvider.otherwise('/login');
    function load(srcs) {
        return {
            deps: function ($ocLazyLoad, $q) {
                var exists = false;
                for (var i = 0; i <= srcs.length; i++) {
                    if (srcs[i] == 'js/libs/user.class.js') {
                        exists = true;
                    }
                }
                if (!exists) {
                    srcs.push('js/libs/user.class.js');
                    srcs.push('js/libs/client.class.js');
                }
                var deferred = $q.defer();
                var promise = deferred.promise;
                promise = promise.then(function () {
                    return $ocLazyLoad.load('js/mainClasses.js');
                });
                angular.forEach(srcs, function (src) {
                    promise = promise.then(function () {
                        return $ocLazyLoad.load(src);
                    });
                });
                deferred.resolve();
                return promise;
            }
        };
    }
});
