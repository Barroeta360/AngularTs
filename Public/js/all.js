"use strict";
var project = angular.module('project', [
    'ngStorage',
    'ngAnimate',
    'ui.bootstrap',
    'chieffancypants.loadingBar',
    'ui.router',
    'oc.lazyLoad',
    'datatables',
    'ladda',
    '720kb.tooltips',
    'hl.sticky',
    'angularjs-dropdown-multiselect',
    'textAngular'
]);

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

"use strict";
project.controller('main', function () {
    var _this = this;
    this.showModal = function (id) {
        $(id).modal('show');
    };
    this.go = function (state) {
        angularServices.window.href = "#" + state;
    };
    this.console = function (any) {
        console.log(any);
    };
    this.functions = new Object();
    this.functions.dias = new Days();
    this.functions.formatDate12 = formatDate12;
    this.functions.formatTime12 = formatTime12;
    this.functions.clearCache = function () {
        angularServices.ss.$reset();
    };
    this.rs = angularServices.rs;
    this.init = function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        closeModal('#menuModal');
        $('.tooltip').remove();
        var myHash = window.location.hash.replace('#', '').split('?');
        if (myHash[0] == '/login') {
            _this.rs.showComponent = false;
        }
        else {
            _this.rs.showComponent = true;
        }
        pathData = myHash[1];
        switch (myHash[0]) {
            case '/home':
                _this.app = new IndexController(angularServices);
                break;
            case '/login':
                _this.app = new LoginController(angularServices);
                break;
            case '/test':
                break;
            default:
        }
        ;
    };
});

"use strict";
project.run(function ($rootScope, $sessionStorage, $http, $ocLazyLoad, $sce, $q, $location, $window, $localStorage) {
    $rootScope.showComponent = false;
    angularServices = {
        rs: $rootScope,
        ss: $sessionStorage,
        http: $http,
        lazy: $ocLazyLoad,
        sce: $sce,
        q: $q,
        location: $location,
        window: $window,
        localStorage: $localStorage,
        cookie: 0
    };
    loc = function () {
        if ($http.defaults.headers != undefined)
            $http.defaults.headers.common['W-Token'] = $sessionStorage.tk;
    };
    loc();
    load = function (src) {
        return $ocLazyLoad.load(src);
    };
    dataUrl = function (file) {
        var $d = $q.defer();
        var $p = $d.promise;
        if (file.files && file.files[0]) {
            var f = file.files[0];
            var dSize = void 0;
            if ($(file).attr('data-size')) {
                dSize = $(file).attr('data-size');
            }
            else {
                dSize = 1000;
            }
            dSize = dSize.toString();
            var size = parseInt(dSize);
            var sizeKB = size / 1000;
            if (f.size < size) {
                var reader = new FileReader();
                var targetId_1 = new String($(file).attr('data-target'));
                reader.readAsDataURL(file.files[0]);
                reader.onload = function (e) {
                    $("#" + targetId_1).css('background-image', "url(" + e.target.result + ")");
                    var myImg = {
                        b64: e.target.result,
                        name: file.files[0].name
                    };
                    $d.resolve(myImg);
                };
            }
            else {
                swAlert('Oops', "El tamano del archivo no puede ser mayor a " + sizeKB + "kb", 'error');
            }
            return $p;
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJjb25maWcuanMiLCJjb250cm9sbGVyLmpzIiwicnVuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIHByb2plY3QgPSBhbmd1bGFyLm1vZHVsZSgncHJvamVjdCcsIFtcbiAgICAnbmdTdG9yYWdlJyxcbiAgICAnbmdBbmltYXRlJyxcbiAgICAndWkuYm9vdHN0cmFwJyxcbiAgICAnY2hpZWZmYW5jeXBhbnRzLmxvYWRpbmdCYXInLFxuICAgICd1aS5yb3V0ZXInLFxuICAgICdvYy5sYXp5TG9hZCcsXG4gICAgJ2RhdGF0YWJsZXMnLFxuICAgICdsYWRkYScsXG4gICAgJzcyMGtiLnRvb2x0aXBzJyxcbiAgICAnaGwuc3RpY2t5JyxcbiAgICAnYW5ndWxhcmpzLWRyb3Bkb3duLW11bHRpc2VsZWN0JyxcbiAgICAndGV4dEFuZ3VsYXInXG5dKTtcbiIsIlwidXNlIHN0cmljdFwiO1xucHJvamVjdC5jb25maWcoZnVuY3Rpb24gKGNmcExvYWRpbmdCYXJQcm92aWRlciwgJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgICBjZnBMb2FkaW5nQmFyUHJvdmlkZXIuaW5jbHVkZVNwaW5uZXIgPSB0cnVlO1xuICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnL2hvbWUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2luY2x1ZGVzL2hvbWUuaHRtbCcsXG4gICAgICAgIHRpdGxlOiAnSG9tZScsXG4gICAgICAgIHJlc29sdmU6IGxvYWQoW1xuICAgICAgICAgICAgJ2pzL2NvbnRyb2xsZXJzL2luZGV4LmNvbnRyb2xsZXIuanMnLFxuICAgICAgICBdKVxuICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnaW5jbHVkZXMvbG9naW4uaHRtbCcsXG4gICAgICAgIHJlc29sdmU6IGxvYWQoW1xuICAgICAgICAgICAgJ2pzL2NvbnRyb2xsZXJzL2xvZ2luLmNvbnRyb2xsZXIuanMnXG4gICAgICAgIF0pXG4gICAgfSk7XG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2xvZ2luJyk7XG4gICAgZnVuY3Rpb24gbG9hZChzcmNzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkZXBzOiBmdW5jdGlvbiAoJG9jTGF6eUxvYWQsICRxKSB7XG4gICAgICAgICAgICAgICAgdmFyIGV4aXN0cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IHNyY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNyY3NbaV0gPT0gJ2pzL2xpYnMvdXNlci5jbGFzcy5qcycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFleGlzdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Jjcy5wdXNoKCdqcy9saWJzL3VzZXIuY2xhc3MuanMnKTtcbiAgICAgICAgICAgICAgICAgICAgc3Jjcy5wdXNoKCdqcy9saWJzL2NsaWVudC5jbGFzcy5qcycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRvY0xhenlMb2FkLmxvYWQoJ2pzL21haW5DbGFzc2VzLmpzJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHNyY3MsIGZ1bmN0aW9uIChzcmMpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJG9jTGF6eUxvYWQubG9hZChzcmMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnByb2plY3QuY29udHJvbGxlcignbWFpbicsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMuc2hvd01vZGFsID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICQoaWQpLm1vZGFsKCdzaG93Jyk7XG4gICAgfTtcbiAgICB0aGlzLmdvID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgIGFuZ3VsYXJTZXJ2aWNlcy53aW5kb3cuaHJlZiA9IFwiI1wiICsgc3RhdGU7XG4gICAgfTtcbiAgICB0aGlzLmNvbnNvbGUgPSBmdW5jdGlvbiAoYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGFueSk7XG4gICAgfTtcbiAgICB0aGlzLmZ1bmN0aW9ucyA9IG5ldyBPYmplY3QoKTtcbiAgICB0aGlzLmZ1bmN0aW9ucy5kaWFzID0gbmV3IERheXMoKTtcbiAgICB0aGlzLmZ1bmN0aW9ucy5mb3JtYXREYXRlMTIgPSBmb3JtYXREYXRlMTI7XG4gICAgdGhpcy5mdW5jdGlvbnMuZm9ybWF0VGltZTEyID0gZm9ybWF0VGltZTEyO1xuICAgIHRoaXMuZnVuY3Rpb25zLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFuZ3VsYXJTZXJ2aWNlcy5zcy4kcmVzZXQoKTtcbiAgICB9O1xuICAgIHRoaXMucnMgPSBhbmd1bGFyU2VydmljZXMucnM7XG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IDBcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgY2xvc2VNb2RhbCgnI21lbnVNb2RhbCcpO1xuICAgICAgICAkKCcudG9vbHRpcCcpLnJlbW92ZSgpO1xuICAgICAgICB2YXIgbXlIYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKS5zcGxpdCgnPycpO1xuICAgICAgICBpZiAobXlIYXNoWzBdID09ICcvbG9naW4nKSB7XG4gICAgICAgICAgICBfdGhpcy5ycy5zaG93Q29tcG9uZW50ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5ycy5zaG93Q29tcG9uZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBwYXRoRGF0YSA9IG15SGFzaFsxXTtcbiAgICAgICAgc3dpdGNoIChteUhhc2hbMF0pIHtcbiAgICAgICAgICAgIGNhc2UgJy9ob21lJzpcbiAgICAgICAgICAgICAgICBfdGhpcy5hcHAgPSBuZXcgSW5kZXhDb250cm9sbGVyKGFuZ3VsYXJTZXJ2aWNlcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcvbG9naW4nOlxuICAgICAgICAgICAgICAgIF90aGlzLmFwcCA9IG5ldyBMb2dpbkNvbnRyb2xsZXIoYW5ndWxhclNlcnZpY2VzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJy90ZXN0JzpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cbiAgICAgICAgO1xuICAgIH07XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xucHJvamVjdC5ydW4oZnVuY3Rpb24gKCRyb290U2NvcGUsICRzZXNzaW9uU3RvcmFnZSwgJGh0dHAsICRvY0xhenlMb2FkLCAkc2NlLCAkcSwgJGxvY2F0aW9uLCAkd2luZG93LCAkbG9jYWxTdG9yYWdlKSB7XG4gICAgJHJvb3RTY29wZS5zaG93Q29tcG9uZW50ID0gZmFsc2U7XG4gICAgYW5ndWxhclNlcnZpY2VzID0ge1xuICAgICAgICByczogJHJvb3RTY29wZSxcbiAgICAgICAgc3M6ICRzZXNzaW9uU3RvcmFnZSxcbiAgICAgICAgaHR0cDogJGh0dHAsXG4gICAgICAgIGxhenk6ICRvY0xhenlMb2FkLFxuICAgICAgICBzY2U6ICRzY2UsXG4gICAgICAgIHE6ICRxLFxuICAgICAgICBsb2NhdGlvbjogJGxvY2F0aW9uLFxuICAgICAgICB3aW5kb3c6ICR3aW5kb3csXG4gICAgICAgIGxvY2FsU3RvcmFnZTogJGxvY2FsU3RvcmFnZSxcbiAgICAgICAgY29va2llOiAwXG4gICAgfTtcbiAgICBsb2MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkaHR0cC5kZWZhdWx0cy5oZWFkZXJzICE9IHVuZGVmaW5lZClcbiAgICAgICAgICAgICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydXLVRva2VuJ10gPSAkc2Vzc2lvblN0b3JhZ2UudGs7XG4gICAgfTtcbiAgICBsb2MoKTtcbiAgICBsb2FkID0gZnVuY3Rpb24gKHNyYykge1xuICAgICAgICByZXR1cm4gJG9jTGF6eUxvYWQubG9hZChzcmMpO1xuICAgIH07XG4gICAgZGF0YVVybCA9IGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgIHZhciAkZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgIHZhciAkcCA9ICRkLnByb21pc2U7XG4gICAgICAgIGlmIChmaWxlLmZpbGVzICYmIGZpbGUuZmlsZXNbMF0pIHtcbiAgICAgICAgICAgIHZhciBmID0gZmlsZS5maWxlc1swXTtcbiAgICAgICAgICAgIHZhciBkU2l6ZSA9IHZvaWQgMDtcbiAgICAgICAgICAgIGlmICgkKGZpbGUpLmF0dHIoJ2RhdGEtc2l6ZScpKSB7XG4gICAgICAgICAgICAgICAgZFNpemUgPSAkKGZpbGUpLmF0dHIoJ2RhdGEtc2l6ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZFNpemUgPSAxMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZFNpemUgPSBkU2l6ZS50b1N0cmluZygpO1xuICAgICAgICAgICAgdmFyIHNpemUgPSBwYXJzZUludChkU2l6ZSk7XG4gICAgICAgICAgICB2YXIgc2l6ZUtCID0gc2l6ZSAvIDEwMDA7XG4gICAgICAgICAgICBpZiAoZi5zaXplIDwgc2l6ZSkge1xuICAgICAgICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRJZF8xID0gbmV3IFN0cmluZygkKGZpbGUpLmF0dHIoJ2RhdGEtdGFyZ2V0JykpO1xuICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUuZmlsZXNbMF0pO1xuICAgICAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAkKFwiI1wiICsgdGFyZ2V0SWRfMSkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgXCJ1cmwoXCIgKyBlLnRhcmdldC5yZXN1bHQgKyBcIilcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBteUltZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGI2NDogZS50YXJnZXQucmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZmlsZS5maWxlc1swXS5uYW1lXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICRkLnJlc29sdmUobXlJbWcpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd0FsZXJ0KCdPb3BzJywgXCJFbCB0YW1hbm8gZGVsIGFyY2hpdm8gbm8gcHVlZGUgc2VyIG1heW9yIGEgXCIgKyBzaXplS0IgKyBcImtiXCIsICdlcnJvcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICRwO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl19
