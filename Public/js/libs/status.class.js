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
var Status = (function (_super) {
    __extends(Status, _super);
    function Status(http, q) {
        var _this = _super.call(this, http, q) || this;
        _this.set = function (data) {
            _this.id = data.id;
            _this.description = data.description;
        };
        _this.update = function () {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "status/" + _this.id,
                data: {
                    "description": _this.description
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Status Actualizado', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'El status no se ha podido actualizar\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.create = function () {
            var sr = {
                method: 'POST',
                url: serviceRoot + "status",
                data: {
                    "description": _this.description
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Status registrado!!!', 'success');
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
                url: serviceRoot + "status/" + _this.id,
                data: null,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Status Eliminado!!!', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Success', 'El estatus no se puede eliminar!!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.description = '';
        return _this;
    }
    return Status;
}(ModelService));
