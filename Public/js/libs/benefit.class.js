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
var Benefit = (function (_super) {
    __extends(Benefit, _super);
    function Benefit(http, q) {
        var _this = _super.call(this, http, q) || this;
        _this.get = function () {
            var sr = {
                method: 'GET',
                url: serviceRoot + "planbenefit/" + _this.planId,
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
        _this.create = function () {
            var sr = {
                method: 'POST',
                url: serviceRoot + "planbenefit",
                data: {
                    "planId": _this.planId,
                    "benefitPromotion": _this.benefitPromotion,
                    "benefitEvent": _this.benefitEvent,
                    "benefitDaily": _this.benefitDaily,
                    "benefitImage": _this.benefitImage,
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Beneficios registrado!!!', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'Los beneficios no se han podido crear\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.set = function (data) {
            if (data) {
                _this.id = data.id;
                _this.statusId = data.statusId;
                _this.planId = data.planId;
                _this.benefitDaily = data.benefitDaily;
                _this.benefitEvent = data.benefitEvent;
                _this.benefitImage = data.benefitImage;
                _this.benefitPromotion = data.benefitPromotion;
            }
        };
        _this.update = function () {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "planbenefit/" + _this.id,
                data: {
                    "statusId": _this.statusId,
                    "planId": _this.planId,
                    "benefitPromotion": _this.benefitPromotion,
                    "benefitEvent": _this.benefitEvent,
                    "benefitDaily": _this.benefitDaily,
                    "benefitImage": _this.benefitImage,
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Beneficios Actualizados', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'Los beneficios no se han podido Actualizar\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.delete = function () {
            var sr = {
                method: 'DELETE',
                url: serviceRoot + "planbenefit/" + _this.id,
                data: null,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Beneficios Eliminados!!!', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'Los beneficios no se han podido Eliminar\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.planId = 0;
        _this.benefitPromotion = 0;
        _this.benefitEvent = 0;
        _this.benefitDaily = 0;
        _this.benefitImage = 0;
        return _this;
    }
    return Benefit;
}(ModelService));
