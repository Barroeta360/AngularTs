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
var UserTypeList = (function (_super) {
    __extends(UserTypeList, _super);
    function UserTypeList(angular) {
        var _this = _super.call(this, angular) || this;
        _this.get = function () {
            var sr = {
                method: 'GET',
                url: serviceRoot + "usertype",
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
        _this.setArray = function (data) {
            var list = [];
            for (var i = 0; i < data.length; i++) {
                var ut = new UserType(_this.angular.http, _this.angular.q);
                ut.set(data[i]);
                list.push(ut);
            }
            for (var i = 0; i < list.length; i++) {
                if (list[i].statusId == 1) {
                    _this.listArray[list[i].id] = list[i].description;
                }
            }
        };
        _this.getHttp = function () {
            return _this.angular.http.get(serviceRoot + 'usertype');
        };
        _this.listArray = [];
        return _this;
    }
    return UserTypeList;
}(ConsumeService));
var UserType = (function (_super) {
    __extends(UserType, _super);
    function UserType(http, q) {
        var _this = _super.call(this, http, q) || this;
        _this.set = function (data) {
            _this.description = data.description;
            _this.id = data.id;
            _this.statusId = data.statusId;
            _this.imageArchiveId = data.imageArchiveId;
        };
        _this.update = function () {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "usertype/" + _this.id,
                data: {
                    "imageArchiveId": _this.imageArchiveId,
                    "description": _this.description,
                    "statusId": _this.statusId
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Tipo de Usuario Actualizado', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'El Tipo de Usuario no se ha podido Actualizar\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.create = function () {
            var sr = {
                method: 'POST',
                url: serviceRoot + "usertype",
                data: {
                    "imageArchiveId": _this.imageArchiveId,
                    "description": _this.description,
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Tag Creado', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'El tag no se ha podido crear\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.delete = function () {
            var sr = {
                method: 'DELETE',
                url: serviceRoot + "usertype/" + _this.id,
                data: null,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Tipo de usuario Eliminado!!!', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'El tipo de usuario no se ha podido eliminar\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.description = '';
        _this.imageArchiveId = 0;
        return _this;
    }
    return UserType;
}(ModelService));
