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
var StateList = (function (_super) {
    __extends(StateList, _super);
    function StateList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.get = function (id) {
            var sr = {
                method: 'GET',
                url: serviceRoot + "state/" + id,
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
            return _this.angular.http.get(serviceRoot + "state/" + id);
        };
        return _this;
    }
    return StateList;
}(ConsumeService));
var State = (function (_super) {
    __extends(State, _super);
    function State(http, q, countryId) {
        var _this = _super.call(this, http, q) || this;
        _this.set = function (state) {
            _this.id = state.id;
            _this.name = state.name;
            _this.statusId = state.statusId;
        };
        _this.update = function () {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "state/" + _this.id,
                data: {
                    "name": _this.name,
                    "countryId": _this.countryId,
                    "statusId": _this.statusId
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Estado Actualizado', 'success');
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
                url: serviceRoot + "state",
                data: {
                    "name": _this.name,
                    "countryId": _this.countryId
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Estado registrado!!!', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'El estado no se ha podido crear\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.delete = function () {
            var sr = {
                method: 'DELETE',
                url: serviceRoot + "state/" + _this.id,
                data: null,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Estado Eliminado!!!', 'success');
                    return data;
                },
                error: function (error) {
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.countryId = countryId;
        _this.name = '';
        _this.id = 0;
        return _this;
    }
    return State;
}(ModelService));
