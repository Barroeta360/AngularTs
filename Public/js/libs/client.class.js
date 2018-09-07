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
var ClientList = (function (_super) {
    __extends(ClientList, _super);
    function ClientList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getHttp = function () {
            return _this.angular.http.get(serviceRoot + "client");
        };
        _this.get = function () {
            var sr = {
                method: 'GET',
                url: serviceRoot + "client",
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
        return _this;
    }
    return ClientList;
}(ConsumeService));
var Client = (function (_super) {
    __extends(Client, _super);
    function Client(http, q) {
        var _this = _super.call(this, http, q) || this;
        _this.get = function (id) {
            var sr = {
                method: 'GET',
                url: serviceRoot + "client/" + id,
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
        _this.set = function (data) {
            if (data) {
                _this.name = data.name;
                _this.id = data.id;
                _this.statusId = data.statusId;
                _this.lastname = data.lastname;
                _this.telephone = data.telephone;
                _this.userId = data.userId;
                _this.birthday = formatDate(data.birthday);
            }
        };
        _this.update = function () {
            console.log(_this);
            var sr = {
                method: 'PUT',
                url: serviceRoot + "client/" + _this.id,
                data: {
                    "name": _this.name,
                    "lastname": _this.lastname,
                    "telephone": _this.telephone,
                    "userId": _this.userId,
                    "statusId": _this.statusId
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Usuario Actualizado', 'success');
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
                url: serviceRoot + "client",
                data: {
                    "name": _this.name,
                    "lastname": _this.lastname,
                    "telephone": _this.telephone,
                    "userId": _this.userId
                },
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
        _this.delete = function () {
            var sr = {
                method: 'DELETE',
                url: serviceRoot + "client/" + _this.id,
                data: null,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Usuario Eliminado!!!', 'success');
                    return data;
                },
                error: function (error) {
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.name = '';
        _this.lastname = '';
        _this.telephone = '';
        _this.userId = 0;
        _this.birthday = null;
        _this.genre = '';
        _this.localphone = '';
        _this.civilStatus = 0;
        _this.childQuantity = "";
        _this.zone = 0;
        _this.dni = null;
        _this.notification = false;
        return _this;
    }
    return Client;
}(ModelService));
