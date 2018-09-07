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
var CityList = (function (_super) {
    __extends(CityList, _super);
    function CityList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.get = function (id) {
            var sr = {
                method: 'GET',
                url: serviceRoot + "city/" + id,
                data: null,
                header: null,
                success: function (data) {
                    return data;
                },
                error: function (error, status) {
                    var data = {
                        error: error,
                        status: status
                    };
                    return data;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.getHttp = function (id) {
            return _this.angular.http.get(serviceRoot + "city/" + id);
        };
        return _this;
    }
    return CityList;
}(ConsumeService));
var City = (function (_super) {
    __extends(City, _super);
    function City(http, q, stateId) {
        var _this = _super.call(this, http, q) || this;
        _this.create = function () {
            var sr = {
                method: 'POST',
                url: serviceRoot + "city",
                data: {
                    "stateId": _this.stateId,
                    "name": _this.name,
                    "zipCode": _this.zipCode,
                    "latitude": _this.latitude,
                    "longitude": _this.longitude
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Ciudad registrado!!!', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'La ciudad no se ha podido crear\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.set = function (city) {
            _this.id = city.id;
            _this.name = city.name;
            _this.statusId = city.statusId;
            _this.zipCode = city.zipCode;
            _this.latitude = city.latitude;
            _this.longitude = city.longitude;
        };
        _this.update = function () {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "city/" + _this.id,
                data: {
                    "stateId": _this.stateId,
                    "name": _this.name,
                    "zipCode": _this.zipCode,
                    "latitude": _this.latitude,
                    "longitude": _this.longitude,
                    "statusId": _this.statusId
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Ciudad Actualizado', 'success');
                    return data;
                },
                error: function (error) {
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.delete = function () {
            var sr = {
                method: 'DELETE',
                url: serviceRoot + "city/" + _this.id,
                data: null,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Ciudad Eliminado!!!', 'success');
                    return data;
                },
                error: function (error) {
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.name = '';
        _this.zipCode = 0;
        _this.latitude = 0;
        _this.longitude = 0;
        _this.stateId = stateId;
        return _this;
    }
    return City;
}(ModelService));
