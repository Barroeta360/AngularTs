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
var CountryList = (function (_super) {
    __extends(CountryList, _super);
    function CountryList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.get = function () {
            var sr = {
                method: 'GET',
                url: serviceRoot + "country",
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
        _this.getHttp = function () {
            return _this.angular.http.get(serviceRoot + "country");
        };
        return _this;
    }
    return CountryList;
}(ConsumeService));
var Country = (function (_super) {
    __extends(Country, _super);
    function Country(http, q) {
        var _this = _super.call(this, http, q) || this;
        _this.set = function (country) {
            _this.name = country.name;
            _this.code = country.code;
            _this.id = country.id;
            _this.statusId = country.statusId;
        };
        _this.update = function () {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "country/" + _this.id,
                data: {
                    "name": _this.name,
                    "code": _this.code,
                    "statusId": _this.statusId
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Pais Actualizado', 'success');
                    return data;
                },
                error: function (error) {
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.create = function () {
            var sr = {
                method: 'POST',
                url: serviceRoot + "country",
                data: {
                    "name": _this.name,
                    "code": _this.code
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Pais registrado!!!', 'success');
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
                url: serviceRoot + "country/" + _this.id,
                data: null,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Pais Eliminado!!!', 'success');
                    return data;
                },
                error: function (error) {
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.name = '';
        _this.code = 0;
        return _this;
    }
    return Country;
}(ModelService));
