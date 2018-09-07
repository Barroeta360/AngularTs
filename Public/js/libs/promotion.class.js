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
var Promotion = (function (_super) {
    __extends(Promotion, _super);
    function Promotion(http, q, userTypeId, institutionId) {
        var _this = _super.call(this, http, q) || this;
        _this.userTypeId = userTypeId;
        _this.institutionId = institutionId;
        _this.set = function (data) {
            console.log(data);
            _this.id = data.id;
            _this.institutionId = data.institutionId;
            _this.title = data.title;
            _this.description = data.description;
            _this.originalImage1.id = (data.originalImageId1) ? data.originalImageId1 : (data.originalImage1) ? data.originalImage1.id : 0;
            _this.originalImage1.contentBase64 = (data.originalImageId1) ? data.originalImage[0] : (data.originalImage1) ? data.originalImage1.contentBase64 : 0;
            _this.originalImage2.id = (data.originalImageId2) ? data.originalImageId2 : (data.originalImage2) ? data.originalImage2.id : 0;
            _this.originalImage2.contentBase64 = (data.originalImageId2) ? data.originalImage[1] : (data.originalImage2) ? data.originalImage2.contentBase64 : 0;
            _this.originalImage3.id = (data.originalImageId3) ? data.originalImageId3 : (data.originalImage3) ? data.originalImage3.id : 0;
            _this.originalImage3.contentBase64 = (data.originalImageId3) ? data.originalImage[2] : (data.originalImage3) ? data.originalImage3.contentBase64 : 0;
            _this.originalImage4.id = (data.originalImageId4) ? data.originalImageId4 : (data.originalImage4) ? data.originalImage4.id : 0;
            _this.originalImage4.contentBase64 = (data.originalImageId4) ? data.originalImage[3] : (data.originalImage4) ? data.originalImage4.contentBase64 : 0;
            _this.specialPromotionStartDay = (typeof data.specialPromotionStartDay == 'string') ? formatDate(data.specialPromotionStartDay) : data.specialPromotionStartDay;
            _this.from = (typeof data.specialPromotionStartDay == 'string') ? data.specialPromotionStartDay : '';
            _this.specialPromotionEndDay = (typeof data.specialPromotionEndDay == 'string') ? formatDate(data.specialPromotionEndDay) : data.specialPromotionEndDay;
            _this.to = (typeof data.specialPromotionEndDay == 'string') ? data.specialPromotionEndDay : '';
            _this.statusId = data.statusId;
            console.log(_this);
        };
        _this.update = function () {
            var data = {
                "institutionId": _this.institutionId,
                "title": _this.title,
                "description": _this.description,
                "specialPromotionStartDay": dateToString(_this.specialPromotionStartDay),
                "specialPromotionEndDay": dateToString(_this.specialPromotionEndDay),
                "originalImageId1": (_this.originalImage1.id > 0) ? _this.originalImage1.id : null,
                "originalImageId2": (_this.originalImage2.id > 0) ? _this.originalImage2.id : null,
                "originalImageId3": (_this.originalImage3.id > 0) ? _this.originalImage3.id : null,
                "originalImageId4": (_this.originalImage4.id > 0) ? _this.originalImage4.id : null,
                "statusId": _this.statusId
            };
            var sr = {
                method: 'PUT',
                url: serviceRoot + "specialpromotion/" + _this.id,
                data: data,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Promocion actualizada', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'El evento no se ha podido actualizar\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.create = function () {
            var create = {
                "institutionId": _this.institutionId,
                "title": _this.title,
                "description": _this.description,
                "specialPromotionStartDay": dateToString(_this.specialPromotionStartDay),
                "specialPromotionEndDay": dateToString(_this.specialPromotionEndDay),
                "originalImageId1": (_this.originalImage1.id > 0) ? _this.originalImage1.id : null,
                "originalImageId2": (_this.originalImage2.id > 0) ? _this.originalImage2.id : null,
                "originalImageId3": (_this.originalImage3.id > 0) ? _this.originalImage3.id : null,
                "originalImageId4": (_this.originalImage4.id > 0) ? _this.originalImage4.id : null
            };
            var sr = {
                method: 'POST',
                url: serviceRoot + "specialpromotion",
                data: create,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Promocion registrada!!!', 'success');
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
                url: serviceRoot + "specialpromotion/" + _this.id,
                data: null,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Promocion Eliminada!!!', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Success', 'La promocion no se puede eliminar!!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.id = 0;
        _this.title = '';
        _this.description = '';
        _this.originalImage1 = new Imagen(http, q, 'original', userTypeId);
        _this.originalImage2 = new Imagen(http, q, 'original', userTypeId);
        _this.originalImage3 = new Imagen(http, q, 'original', userTypeId);
        _this.originalImage4 = new Imagen(http, q, 'original', userTypeId);
        _this.specialPromotionStartDay = new Date();
        _this.specialPromotionEndDay = new Date();
        _this.from = '';
        _this.to = '';
        _this.desc = '';
        return _this;
    }
    return Promotion;
}(ModelService));
