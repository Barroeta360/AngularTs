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
var MembershipType = (function (_super) {
    __extends(MembershipType, _super);
    function MembershipType(http, q) {
        var _this = _super.call(this, http, q) || this;
        _this.set = function (data) {
            _this.description = data.description;
            _this.id = data.id;
            _this.statusId = data.statusId;
        };
        _this.update = function () {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "plantype/" + _this.id,
                data: {
                    "description": _this.description,
                    "statusId": _this.statusId
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Tipo de Plan Actualizado', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'El Tipo de Plan no se ha podido Actualizar\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.create = function () {
            var sr = {
                method: 'POST',
                url: serviceRoot + "plantype",
                data: {
                    "description": _this.description,
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Tipo de plan Creado', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'El tipo de plan no se ha podido crear\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.delete = function () {
            var sr = {
                method: 'DELETE',
                url: serviceRoot + "plantype/" + _this.id,
                data: null,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Tipo de plan Eliminado!!!', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'El tipo de plan no se ha podido eliminar\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.description = '';
        return _this;
    }
    return MembershipType;
}(ModelService));
