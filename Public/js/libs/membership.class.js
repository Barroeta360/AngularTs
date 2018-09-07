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
var Membership = (function (_super) {
    __extends(Membership, _super);
    function Membership(http, q, typeId) {
        var _this = _super.call(this, http, q) || this;
        _this.set = function (data) {
            console.log(data);
            _this.id = data.id;
            _this.priceId = data.priceId;
            _this.title = data.title;
            _this.description = data.description;
            _this.benefit.set(data.benefit);
            _this.price = data.price;
            _this.typeId = data.typeId;
            _this.image.id = (data.originalImageId) ? data.originalImageId : (data.image.id) ? data.image.id : 0;
            _this.image.contentBase64 = (data.originalImageId) ? data.originalImage : (data.image.id) ? data.image.contentBase64 : '';
            _this.statusId = data.statusId;
            _this.from = data.from;
            _this.to = data.to;
            _this.duration = data.duration;
            console.log(_this);
        };
        _this.get = function () {
            var sr = {
                method: 'GET',
                url: serviceRoot + "plan/" + _this.id,
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
        _this.update = function () {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "plan/" + _this.id,
                data: {
                    "priceId": _this.priceId,
                    "title": _this.title,
                    "description": _this.description,
                    "statusId": _this.statusId,
                    "originalImageId": (_this.image.id > 0) ? _this.image.id : null,
                    "typeId": _this.typeId,
                    "duration": toInt(_this.duration)
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Membersia actualizada', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'La membresia no se ha podido actualizar\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.create = function () {
            var sr = {
                method: 'POST',
                url: serviceRoot + "plan",
                data: {
                    "priceId": _this.priceId,
                    "title": _this.title,
                    "description": _this.description,
                    "originalImageId": (_this.image.id > 0) ? _this.image.id : null,
                    "typeId": _this.typeId,
                    "duration": toInt(_this.duration)
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Membresia registrada!!!', 'success');
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
                url: serviceRoot + "plan/" + _this.id,
                data: null,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Membresia Eliminada!!!', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Success', 'La membresia no se puede eliminar!!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.benefitToMembership = function (membership) {
            var $q = _this.q;
            var $d = $q.defer();
            var $p = $d.promise;
            membership.benefit.get().then(function (value) {
                console.log(value);
                membership.benefit.set(value);
                $d.resolve(membership);
            }).catch(function (reason) {
                $d.reject(reason);
                console.log(reason);
            });
            return $p;
        };
        _this.setMeABenefit = function () {
            var $q = _this.q;
            var $d = $q.defer();
            var $p = $d.promise;
            _this.benefit.get().then(function (value) {
                _this.benefit.set(value);
                $d.resolve(_this);
            }).catch(function (reason) {
                $d.reject(reason);
                console.log(reason);
            });
            return $p;
        };
        _this.id = 0;
        _this.priceId = 0;
        _this.title = '';
        _this.description = '';
        _this.image = new Imagen(http, q, 'plan', typeId);
        _this.benefit = new Benefit(_this.http, _this.q);
        _this.price = 0;
        _this.from = new Date();
        _this.to = new Date();
        _this.typeId = 0;
        _this.duration = 0;
        return _this;
    }
    return Membership;
}(ModelService));
