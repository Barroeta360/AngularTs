"use strict";
var GoogleMap = (function () {
    function GoogleMap(angular, element) {
        var _this = this;
        this.angular = angular;
        this.element = element;
        this.showCurrent = true;
        this.getCountry = function () {
            _this.countryList.get().then(function (value) {
                _this.countryList.list = value;
                if (value.length == 1) {
                    _this.country = value[0].id;
                    console.log(_this.country);
                    _this.getStateList(_this.country);
                }
            });
        };
        this.getCities = function (state) {
            _this.state = state;
            var state_id = state;
            _this.cityList.get(state_id).then(function (r) {
                console.log(r);
                _this.cityList.list = r;
            }, function (r) {
                console.log(r);
                _this.cityList = new ArrayList('city');
            });
        };
        this.getStateList = function (country) {
            _this.country = country;
            var id = country;
            _this.stateList.get(id).then(function (r) {
                console.log(r);
                _this.stateList.list = r;
            }, function (r) {
                console.log(r);
                _this.stateList = new ArrayList('state');
                _this.cityList = new ArrayList('city');
                ;
            });
        };
        this.setLocator = function () {
            _this.angular.ss.oLocator = true;
            var locator = {
                lat: parseFloat(_this.cityList.getById(_this.city).latitude),
                lng: parseFloat(_this.cityList.getById(_this.city).longitude)
            };
            _this.angular.ss.locator = locator;
            console.log(window.location.hash);
            location.reload();
        };
        this.setCurrent = function () {
            _this.angular.ss.oLocator = false;
            location.reload();
        };
        this.setMapEvent = function (e, cb) {
            _this.vMap().then(function () {
                google.maps.event.addListener(_this.map, e, function (event) {
                    cb(event.latLng);
                });
            });
        };
        this.getPosition = function (o) {
            if (o === void 0) { o = null; }
            var p = new Promise(function (resolve, reject) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(resolve, reject, o);
                }
                else {
                    this.currentLocation = {
                        lat: 10.471675,
                        lng: -62.96623569999997
                    };
                    swAlert('Warning', 'It seems like Geolocation, which is required for this page, is not enabled in your browser.', 'error');
                }
            });
            return p;
        };
        this.getCurrentLocation = function () {
            var $d = _this.angular.q.defer();
            var $p = $d.promise;
            _this.vMap().then(function () {
                $d.resolve(_this.currentLocation);
            });
            return $p;
        };
        this.createMarker = function (lc, i) {
            if (lc === void 0) { lc = {}; }
            if (i === void 0) { i = new Institutions(_this.angular, 0, 0); }
            _this.vMap().then(function () {
                if (!lc.lat || !lc.lng) {
                    lc = _this.currentLocation;
                }
                var mI = {
                    marker: new google.maps.Marker({
                        position: lc,
                        draggable: false,
                        animation: google.maps.Animation.DROP,
                        title: 'Prueba',
                        map: _this.map
                    }),
                    institution: i
                };
                _this.marker.push(mI);
            });
        };
        this.createMarkerClickable = function (lc, cb, i) {
            if (lc === void 0) { lc = {}; }
            if (i === void 0) { i = new Institutions(_this.angular, 0, 0); }
            _this.vMap().then(function () {
                if (!lc.lat || !lc.lng) {
                    lc = _this.currentLocation;
                }
                var mI = {
                    marker: new google.maps.Marker({
                        position: lc,
                        draggable: false,
                        animation: google.maps.Animation.DROP,
                        title: (i.name) ? i.name : 'Current',
                        map: _this.map,
                    }),
                    institution: i
                };
                mI.marker.addListener('click', function (event) {
                    cb(mI);
                });
                _this.marker.push(mI);
            });
        };
        this.markersCluster = [];
        this.getPins = function (is, cb) {
            _this.markersCluster = is.map(function (i) {
                console.log(i);
                if (!i.institution) {
                    i.institution = new Institutions(_this.angular, 0, 0);
                }
                var lc = { lat: i.lat, lng: i.lng };
                var mI = {
                    marker: new google.maps.Marker({
                        position: lc,
                        draggable: false,
                        animation: google.maps.Animation.DROP,
                        title: (i.name) ? i.name : (i.institution.name) ? i.institution.name : 'Current',
                        map: _this.map
                    }),
                    institution: i.institution
                };
                mI.marker.addListener('click', function (event) {
                    cb(mI);
                });
                _this.marker.push(mI);
                return mI.marker;
            });
            var markerCluster = new MarkerClusterer(_this.map, _this.markersCluster, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
        };
        this.animationMarket = function (mI) {
            var $d = _this.angular.q.defer();
            var $p = $d.promise;
            mI.marker.setAnimation(google.maps.Animation.BOUNCE);
            _this.institution.id = mI.institution.id;
            _this.institution.name = mI.institution.name;
            _this.institution.getInstitutionProfile().then(function (value) {
                _this.institution.getHeader().then(function (header) {
                    value.header = header;
                    $d.resolve(value);
                }).catch(function (reason) {
                    mI.marker.setAnimation(null);
                    swAlert('Error', 'Error al cargar la informacion de la institucion, \n trate nuevamente', 'error');
                    $d.reject();
                });
            }).catch(function (reason) {
                mI.marker.setAnimation(null);
                console.log(reason);
                swAlert('Error', 'Error al cargar la informacion de la institucion, \n trate nuevamente', 'error');
                $d.reject();
            });
            $p.then(function (value) {
                _this.institution.description = _this.angular.sce.trustAsHtml(value[0].description);
                _this.institution.imageHeader.imagePath = value.header.originalImage;
                _this.url = _this.setUrl(_this.institution);
                console.log(value);
                mI.marker.setAnimation(null);
                $('#map-modal').modal('show');
            });
        };
        this.setUrl = function (i) {
            var url = "#/institutions?" + i.id + "-" + i.name;
            return replaceAll(url, ' ', '_');
        };
        this.createMarkerDragable = function (lc, cb, i) {
            if (lc === void 0) { lc = {}; }
            if (i === void 0) { i = new Institutions(_this.angular, 0, 0); }
            _this.vMap().then(function () {
                if (!lc.lat || !lc.lng) {
                    lc = _this.currentLocation;
                }
                var mI = {
                    marker: new google.maps.Marker({
                        position: lc,
                        draggable: false,
                        animation: google.maps.Animation.DROP,
                        title: 'Prueba',
                        map: _this.map
                    }),
                    institution: i
                };
                _this.marker.push(mI);
                mI.marker.addListener('dragend', function (event) {
                    _this.map.setZoom(16);
                    _this.map.setCenter(mI.marker.getPosition());
                    cb(mI.marker.getPosition());
                });
            });
        };
        this.vMap = function () {
            var $d = _this.angular.q.defer();
            var $p = $d.promise;
            var b = false;
            var i = null;
            i = setInterval(function () {
                if (_this.element == 'no-map') {
                    $d.resolve(true);
                    clearInterval(i);
                }
                if (_this.map != undefined) {
                    $d.resolve(true);
                    clearInterval(i);
                }
            }, 1500);
            return $p;
        };
        this.currentLocation = {};
        this.url = '';
        this.getPosition().then(function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            _this.currentLocation = { lat: lat, lng: lng };
        }).catch(function () {
            swAlert('Warning', 'It seems like Geolocation, which is required for this page, is not enabled in your browser.', 'error');
        })
            .finally(function () {
            if (_this.angular.ss.oLocator) {
                _this.angular.ss.myLocation = _this.currentLocation;
                _this.currentLocation = _this.angular.ss.locator;
            }
            if (_this.currentLocation.lat == undefined) {
                _this.currentLocation = {
                    lat: 10.471675,
                    lng: -62.96623569999997
                };
                _this.showCurrent = false;
            }
            var mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(_this.currentLocation.lat, _this.currentLocation.lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            setTimeout(function () {
                if (document.getElementById(_this.element)) {
                    _this.map = new google.maps.Map(document.getElementById(_this.element), mapOptions);
                }
            }, 2000);
        });
        this.marker = [];
        this.institution = new Institutions(angular, 0, 0);
        this.countryList = new ArrayList('country');
        this.cityList = new ArrayList('city');
        this.stateList = new ArrayList('state');
        this.country = 0;
        this.state = 0;
        this.city = 0;
        this.getCountry();
    }
    return GoogleMap;
}());
