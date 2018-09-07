
project.config(function (cfpLoadingBarProvider: any, $stateProvider: any, $urlRouterProvider: any, $locationProvider: ng.ILocationProvider) {
    /*
    *incluye el spin en cada consulta http
    */
    cfpLoadingBarProvider.includeSpinner = true;

    /*
    * trabajamos la url y los scripts necesarions con el state provider
    */

    $stateProvider
        /*
        *Menu principal
        */
        .state('home', {
            url: '/home',
            templateUrl: 'includes/home.html',
            title: 'Home',
            resolve: load([
                'js/controllers/index.controller.js',
                //class

            ])
        })
        /*
        *Login 
        */
        .state('login', {
            url: '/login',
            templateUrl: 'includes/login.html',
            resolve: load([
                'js/controllers/login.controller.js'
            ])
        })

        
    //default
    $urlRouterProvider.otherwise('/login');

    function load(srcs: Array<string>) {
        return {
            deps: function ($ocLazyLoad: any, $q: ng.IQService) {
                /* let ms: Array<string> = [
                    'js/mainClasses.js'
                ] */
                /*
                * Validate that user.class was loaded
                */
                let exists: boolean = false;
                for (var i = 0; i <= srcs.length; i++) {
                    if (srcs[i] == 'js/libs/user.class.js') {
                        exists = true;
                    }
                }
                if (!exists) {
                    srcs.push('js/libs/user.class.js');
                    srcs.push('js/libs/client.class.js');
                }
                /* let dependencies: Array <any> =[
                    'js/libs/map.class.js',
                    'js/libs/price.class.js',
                    'js/libs/benefit.class.js',
                    'js/libs/membership.class.js',
                    'js/libs/institutions.class.js',
                    'js/libs/country.class.js',
                    'js/libs/city.class.js',
                    'js/libs/states.class.js',
                ] */
                /* dependencies.forEach(dep => {
                    let e:boolean = false;
                    srcs.forEach(s => {
                        if(dep == s){
                            e = true;
                        }
                    });
                    if(!e){
                        srcs.push(dep);
                    }
                }); */
                /*
                * end validate
                */
                var deferred = $q.defer();
                let promise: ng.IPromise<any> = deferred.promise;
                promise = promise.then(function () {
                    return $ocLazyLoad.load('js/mainClasses.js');
                });
                angular.forEach(srcs, function (src: string) {
                    promise = promise.then(function () {
                        return $ocLazyLoad.load(src);
                    });
                });
                deferred.resolve();
                return promise;
            }
        }
    }
});

interface Persona {
    nombre: string,
    apellido: string,
    edad: number,
    saludar: Function
}



