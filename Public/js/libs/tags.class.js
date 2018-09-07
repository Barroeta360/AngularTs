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
var TagList = (function (_super) {
    __extends(TagList, _super);
    function TagList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getHttp = function () {
            return _this.angular.http.get(serviceRoot + "tag");
        };
        _this.get = function () {
            var sr = {
                method: 'GET',
                url: serviceRoot + "tag",
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
        _this.getListByInst = function (id) {
            _this.list = [
                {
                    id: 1,
                    name: 'Restaurant'
                },
                {
                    id: 2,
                    name: 'Bar'
                },
                {
                    id: 3,
                    name: 'Italiano'
                },
            ];
        };
        return _this;
    }
    return TagList;
}(ConsumeService));
var Tag = (function (_super) {
    __extends(Tag, _super);
    function Tag(http, q) {
        var _this = _super.call(this, http, q) || this;
        _this.set = function (data) {
            _this.description = data.description;
            _this.id = data.id;
            _this.statusId = data.statusId;
        };
        _this.update = function () {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "tag/" + _this.id,
                data: {
                    "description": _this.description,
                    "statusId": _this.statusId
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Tag Actualizado', 'success');
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
                url: serviceRoot + "tag",
                data: {
                    "description": _this.description
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Tag registrado!!!', 'success');
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
                url: serviceRoot + "tag/" + _this.id,
                data: null,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Tag Eliminado!!!', 'success');
                    return data;
                },
                error: function (error) {
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.description = '';
        return _this;
    }
    return Tag;
}(ModelService));
