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
