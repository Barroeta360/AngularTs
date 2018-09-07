"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var angularHTTP = (function () {
    function angularHTTP(http, q) {
        var _this = this;
        this.http = http;
        this.q = q;
        this.httpRequest = function (sr) {
            var $http = _this.http;
            var $q = _this.q;
            var $d = $q.defer();
            var $p = $d.promise;
            $http(_this.jsonMethod(sr.method, sr.url, sr.data, sr.header)).then(function (res) {
                $d.resolve(sr.success(res.data));
            }).catch(function (nError) {
                console.log(nError);
                $d.reject(sr.error());
                switch (nError.status) {
                    case -10:
                        swAlert('¡Oops!', 'No se pudo conectar con waychile.com\nTrate nuevamente', 'error');
                        $d.reject(nError);
                        break;
                    case 401:
                        swConfirm('No autorizado!!', 'Su sesión a expirado', 'warning', false).then(function (value) {
                            if (value == true) {
                                var a = angularServices;
                                a.rs.myClient = null;
                                a.rs.myUser = null;
                                a.ss.$reset();
                                if (_this.http.defaults.headers != undefined) {
                                    _this.http.defaults.headers.common['W-Token'] = '';
                                }
                                angularServices.ss.user = null;
                                angularServices.window.location.href = '#/home';
                            }
                        });
                        break;
                    case 403:
                        swConfirm('Sesión Expirada', 'No esta autorizado para ingresar', 'warning', false).then(function (value) {
                            if (value == true) {
                                var a = angularServices;
                                a.rs.myClient = null;
                                a.rs.myUser = null;
                                a.ss.$reset();
                                if (_this.http.defaults.headers != undefined) {
                                    _this.http.defaults.headers.common['W-Token'] = '';
                                }
                                angularServices.ss.user = null;
                                angularServices.window.location.href = '#/home';
                            }
                        });
                        break;
                    case 404:
                        swAlert('Mensaje', 'No hay registros asociados', 'info');
                        $d.reject(nError);
                        break;
                    case 405:
                        $d.reject("Metodo " + nError.config.method + " no permitido para la ruta " + nError.config.url);
                    default:
                        $d.reject(sr.error(nError));
                }
            }).finally(function () {
                $('.tooltip').remove();
            });
            return $p;
        };
        this.falseRequest = function () {
            var $http = _this.http;
            var $q = _this.q;
            var $d = $q.defer();
            var $p = $d.promise;
            $d.resolve(null);
            return $p;
        };
        this.jsonMethod = function (method, url, data, header) {
            if (method == "GET" || method == "DELETE") {
                if (header != null) {
                    return {
                        method: method,
                        url: url,
                        header: header
                    };
                }
                return {
                    method: method,
                    url: url
                };
            }
            else {
                if (header != null) {
                    return {
                        method: method,
                        url: url,
                        data: data,
                        header: header
                    };
                }
                return {
                    method: method,
                    url: url,
                    data: data
                };
            }
        };
    }
    return angularHTTP;
}());
var Controller = (function () {
    function Controller(angular) {
        var _this = this;
        this.angular = angular;
        this.openModal = function (id) {
            $(id).modal('show');
        };
        this.getMyUserType = function (cb) {
            _this.myUserType.get().then(function (value) {
                _this.myUserType.list = value;
                cb();
            });
        };
        this.validateUser = function () {
            var a = _this.angular;
            var c = readCookie('type').trim();
            if (!c || c == '') {
                a.window.location.href = "#/login";
            }
            else {
                _this.myUser.client.name = _this.angular.ss.user.userProfile.name;
                _this.myUser.client.lastname = _this.angular.ss.user.userProfile.lastname;
            }
        };
        this.logOut = function () {
            swConfirm('Cerrar Sesión', 'Estas seguro de cerrar la sesión?').then(function (value) {
                if (value) {
                    _this.myUser = new User(_this.angular.http, _this.angular.q);
                    var a = _this.angular;
                    a.ss.$reset();
                    if (_this.angular.http.defaults.headers != undefined) {
                    }
                    deleteCookie('type');
                    _this.validateUser();
                }
            });
        };
        this.recoverPassword = function () {
            _this.myUser.recoverPassword().then(function (value) {
                closeModal('#modalLoginForm');
                _this.myUser = new User(_this.angular.http, _this.angular.q);
            }).catch(function (reason) {
                console.log(reason);
            });
        };
        this.changePassword = function () {
            _this.myUser.changePassword().then(function (value) {
                closeModal('#changeModal');
            });
        };
        this.fillHeader = function () {
            var length = 3;
            var img = ['media/ed13.jpg', 'media/ed154.png', 'media/ed29.jpg'];
            for (var i = 0; i < length; i++) {
                var newPromoSlide = {
                    image: img[i],
                    text: "Este es el texto para la imagen " + (i + 1),
                    title: "Imagen " + (i + 1),
                    id: i + 1
                };
                _this.slides.push(newPromoSlide);
            }
            console.log(_this.slides);
        };
        this.buttonModalLadda = false;
        this.myUser = new User(angular.http, angular.q);
        this.buttonModal = 'Crear';
        this.myUserType = new ArrayList('usertype');
        this.slides = [];
        this.fillHeader();
        this.validateUser();
    }
    return Controller;
}());
var ModelService = (function (_super) {
    __extends(ModelService, _super);
    function ModelService(http, q) {
        var _this = _super.call(this, http, q) || this;
        _this.set = function (data) {
            _this.statusId = data.statusId;
        };
        _this.update = function (data) {
            if (data === void 0) { data = null; }
            var $q = _this.q;
            return $q.defer().promise;
        };
        _this.updateStatus = function (data) {
            _this.set(data);
            if (_this.statusId == 1) {
                _this.statusId = 3;
            }
            else {
                _this.statusId = 1;
            }
            return _this.update();
        };
        _this.create = function () {
            var $q = _this.q;
            return $q.defer().promise;
        };
        _this.statusId = 3;
        _this.id = 0;
        return _this;
    }
    return ModelService;
}(angularHTTP));
var ConsumeService = (function (_super) {
    __extends(ConsumeService, _super);
    function ConsumeService(angular) {
        var _this = _super.call(this, angular.http, angular.q) || this;
        _this.angular = angular;
        _this.listRequest = [];
        _this.list = [];
        return _this;
    }
    return ConsumeService;
}(angularHTTP));
var ArrayList = (function (_super) {
    __extends(ArrayList, _super);
    function ArrayList(url, list, angular, currentPage, limitTo) {
        if (url === void 0) { url = ''; }
        if (list === void 0) { list = []; }
        if (angular === void 0) { angular = angularServices; }
        if (currentPage === void 0) { currentPage = 0; }
        if (limitTo === void 0) { limitTo = 8; }
        var _this = _super.call(this, angular.http, angular.q) || this;
        _this.url = url;
        _this.list = list;
        _this.angular = angular;
        _this.currentPage = currentPage;
        _this.limitTo = limitTo;
        _this.pgItem = [];
        _this.get = function (id) {
            if (id === void 0) { id = 0; }
            var url;
            if (id != 0) {
                url = "" + serviceRoot + _this.url + "/" + id;
            }
            else {
                url = "" + serviceRoot + _this.url;
            }
            var sr = {
                method: 'GET',
                url: url,
                data: null,
                header: null,
                success: function (data) {
                    return data;
                },
                error: function (error) {
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.setPagination = function (vLenght) {
            var numOfPages = vLenght / _this.limitTo;
            console.log('paginas totales: ' + numOfPages);
            numOfPages = Math.ceil(numOfPages);
            for (var i = 0; i < numOfPages; i++) {
                _this.pgItem[i] = i;
            }
        };
        _this.getHttp = function (id) {
            if (id === void 0) { id = 0; }
            var url;
            if (id != 0) {
                url = "" + serviceRoot + _this.url + "/" + id;
            }
            else {
                url = "" + serviceRoot + _this.url;
            }
            return _this.angular.http.get(url);
        };
        _this.removeStatusIdIgualTo = function () {
        };
        _this.removeId = function (id) {
            for (var i = 0; i < _this.list.length; i++) {
                if (_this.list[i].id == id) {
                    _this.list.splice(i, 1);
                }
            }
        };
        _this.statusIdIgualTo = function (statusId) {
            var filterList;
            filterList = [];
            for (var i = 0; i < _this.list.length; i++) {
                if (_this.list[i].statusId == statusId) {
                    filterList.push(_this.list[i]);
                }
            }
            _this.list = filterList;
        };
        _this.perfilIdIgualTo = function (perfilId) {
            var filterList;
            filterList = [];
            for (var i = 0; i < _this.list.length; i++) {
                var a = _this.list[i];
                if (a.typeId == perfilId) {
                    filterList.push(_this.list[i]);
                }
            }
            _this.list = filterList;
        };
        _this.getDescFromArray = function (id) {
            for (var i = 0; i < _this.list.length; i++) {
                if (_this, _this.list[i].id == id) {
                    return _this.list[i].description;
                }
            }
            return '';
        };
        _this.getNameFromArray = function (id) {
            for (var i = 0; i < _this.list.length; i++) {
                if (_this, _this.list[i].id == id) {
                    return _this.list[i].name;
                }
            }
            return '';
        };
        _this.getById = function (id) {
            for (var i = 0; i < _this.list.length; i++) {
                if (_this.list[i].id == id) {
                    return _this.list[i];
                }
            }
        };
        _this.sticky = new Sticky();
        return _this;
    }
    return ArrayList;
}(angularHTTP));
var PinMarkers = (function (_super) {
    __extends(PinMarkers, _super);
    function PinMarkers(url, distance, latitude, longitude) {
        if (distance === void 0) { distance = 0; }
        if (latitude === void 0) { latitude = 0; }
        if (longitude === void 0) { longitude = 0; }
        var _this = _super.call(this, url) || this;
        _this.distance = distance;
        _this.latitude = latitude;
        _this.longitude = longitude;
        if (_this.distance != 0) {
            _this.url = _this.url + "/" + _this.distance + "/" + _this.latitude + "/" + _this.longitude;
        }
        return _this;
    }
    return PinMarkers;
}(ArrayList));
var Imagen = (function (_super) {
    __extends(Imagen, _super);
    function Imagen(http, q, imageType, userTypeId) {
        var _this = _super.call(this, http, q) || this;
        _this.http = http;
        _this.q = q;
        _this.imageType = imageType;
        _this.userTypeId = userTypeId;
        _this.setContentBase64 = function (cb64) {
            if (cb64 != '') {
                _this.forUpdate = true;
                _this.contentBase64 = cb64;
            }
        };
        _this.create = function () {
            var data = {
                "userTypeId": _this.userTypeId,
                "imageType": _this.imageType,
                "imageName": _this.imageName,
                "contentBase64": _this.contentBase64
            };
            var sri = {
                method: 'POST',
                url: serviceRoot + "image",
                data: data,
                header: null,
                success: function (data) {
                    return data;
                },
                error: function (error) {
                    return error;
                }
            };
            return _this.httpRequest(sri);
        };
        _this.id = 0;
        _this.imagePath = '';
        _this.statusId = 3;
        _this.imageName = '';
        _this.contentBase64 = '';
        _this.forUpdate = false;
        return _this;
    }
    return Imagen;
}(angularHTTP));
var ImageCarousel = (function (_super) {
    __extends(ImageCarousel, _super);
    function ImageCarousel(http, q, imageType, userTypeId) {
        var _this = _super.call(this, http, q, imageType, userTypeId) || this;
        _this.http = http;
        _this.q = q;
        _this.imageType = imageType;
        _this.userTypeId = userTypeId;
        _this.class = '';
        _this.originalImageId = 0;
        return _this;
    }
    return ImageCarousel;
}(Imagen));
var Sticky = (function () {
    function Sticky() {
        var _this = this;
        this.setElements = function () {
            _this.elements++;
            _this.top = -((_this.elements - 1) * _this.height) + 50;
        };
        this.top = 0;
        this.elements = 0;
        this.height = 0;
        this.enable = false;
    }
    return Sticky;
}());
