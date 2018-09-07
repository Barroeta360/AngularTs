
project.run(($rootScope: any, $sessionStorage: any, $http: ng.IHttpService, $ocLazyLoad: any, $sce: ng.ISCEService, $q: ng.IQService, $location: ng.ILocationService, $window: ng.IWindowService, $localStorage: any, /*$cookies: any$httpProvider:any*/) => {
    //s
    $rootScope.showComponent = false;

    //servicios
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
        cookie: 0//$cookies
    }

    loc = function () {
        if ($http.defaults.headers != undefined) $http.defaults.headers.common['W-Token'] = $sessionStorage.tk;
    }

    loc();
    /*
    *funcion lazyload
    */
    load = (src: any) => {
        return $ocLazyLoad.load(src)
    }
    /*
    let $http = this.http;
        let $q: ng.IQService = this.q;
        let $d: ng.IDeferred<any> = $q.defer();
        let $p: ng.IPromise<any> = $d.promise;
    * read Image as URL
    */
    dataUrl = (file: any) => {
        let $d: ng.IDeferred<any> = $q.defer();
        let $p: ng.IPromise<any> = $d.promise;
        //console.log(file.files);
        if (file.files && file.files[0]) {
            let f: any = file.files[0];
            let dSize: any;
            if ($(file).attr('data-size')) {
                dSize = $(file).attr('data-size');
            } else {
                dSize = 1000;
            }
            dSize = dSize.toString();
            let size: number = parseInt(dSize);
            let sizeKB: number = size / 1000;
            if (f.size < size) {
                let reader: FileReader = new FileReader();
                let targetId: String = new String($(file).attr('data-target'));
                reader.readAsDataURL(file.files[0]);
                reader.onload = (e: any) => {
                    $(`#${targetId}`).css('background-image', `url(${e.target.result})`);
                    //angularServices.ss.imageName = file.files[0].name;
                    let myImg: any = {
                        b64: e.target.result,
                        name: file.files[0].name
                    }
                    $d.resolve(myImg);
                }
            } else {
                swAlert('Oops', `El tamano del archivo no puede ser mayor a ${sizeKB}kb`, 'error');
            }

            return $p;
        }
    }


})

//ruta servicios
//let serviceRoot: string = 'https://service.app.com/';