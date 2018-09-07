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
var CategoryTypeList = (function (_super) {
    __extends(CategoryTypeList, _super);
    function CategoryTypeList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.get = function () {
            var sr = {
                method: 'GET',
                url: serviceRoot + "categorytype",
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
            return _this.angular.http.get(serviceRoot + "status");
        };
        return _this;
    }
    return CategoryTypeList;
}(ConsumeService));
var CategoryType = (function (_super) {
    __extends(CategoryType, _super);
    function CategoryType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 0;
        _this.description = '';
        _this.set = function (data) {
            _this.id = data.id;
            _this.description = data.description;
            _this.statusId = data.statusId;
        };
        _this.update = function () {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "categorytype/" + _this.id,
                data: {
                    "description": _this.description,
                    "statusId": _this.statusId
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Tipo de categoría Actualizado', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('¡Oops!', 'El tipo de categoría no se ha podido actualizar\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.create = function () {
            var sr = {
                method: 'POST',
                url: serviceRoot + "categorytype",
                data: {
                    "description": _this.description
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Tipo de categoría registrado!!!', 'success');
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
                url: serviceRoot + "categorytype/" + _this.id,
                data: null,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Tipo de categoría Eliminado!!!', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Success', 'El tipo de categoría no se puede eliminar!!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        return _this;
    }
    return CategoryType;
}(ModelService));
