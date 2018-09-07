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
var PriceList = (function (_super) {
    __extends(PriceList, _super);
    function PriceList(url) {
        var _this = _super.call(this, url) || this;
        _this.getPrice = function (id) {
            for (var i = 0; i < _this.list.length; i++) {
                if (_this.list[i].id == id) {
                    return _this.list[i].price;
                }
            }
            return 0;
        };
        _this.setActiveList = function (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].statusId == 1) {
                    _this.list.push(list[i]);
                }
            }
        };
        _this.list = [];
        return _this;
    }
    return PriceList;
}(ArrayList));
var Price = (function (_super) {
    __extends(Price, _super);
    function Price(http, q) {
        var _this = _super.call(this, http, q) || this;
        _this.create = function () {
            var sr = {
                method: 'POST',
                url: serviceRoot + "price",
                data: {
                    "price": _this.price,
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Precio registrado!!!', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'El precio no se ha podido crear\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.set = function (data) {
            _this.id = data.id;
            _this.price = data.price;
            _this.statusId = data.statusId;
        };
        _this.update = function () {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "price/" + _this.id,
                data: {
                    "price": _this.price,
                    "statusId": _this.statusId
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Precio Actualizado', 'success');
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
                url: serviceRoot + "price/" + _this.id,
                data: null,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Precio Eliminado!!!', 'success');
                    return data;
                },
                error: function (error) {
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.price = 0;
        return _this;
    }
    return Price;
}(ModelService));
