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
var SpecialEvent = (function (_super) {
    __extends(SpecialEvent, _super);
    function SpecialEvent(http, q, userTypeId, institutionId) {
        var _this = _super.call(this, http, q) || this;
        _this.userTypeId = userTypeId;
        _this.institutionId = institutionId;
        _this.set = function (data) {
            console.log(data);
            _this.id = data.id;
            _this.institutionId = data.institutionId;
            _this.title = data.title;
            _this.description = data.description;
            _this.originalImage.id = (data.originalImageId) ? data.originalImageId : (data.originalImage.id) ? data.originalImage.id : 0;
            _this.originalImage.contentBase64 = (data.originalImageId) ? data.originalImage : (data.originalImage.id) ? data.originalImage.contentBase64 : 0;
            _this.specialEventDay = (typeof data.specialEventDay == 'string') ? formatDate(data.specialEventDay) : data.specialEventDay;
            _this.day = (typeof data.specialEventDay == 'string') ? data.specialEventDay : '';
            _this.specialEventFrom = (typeof data.specialEventFrom == 'string') ? formatTime(data.specialEventFrom) : data.specialEventFrom;
            _this.from = (typeof data.specialEventFrom == 'string') ? formatTime12(data.specialEventFrom) : '';
            _this.specialEventTo = (typeof data.specialEventTo == 'string') ? formatTime(data.specialEventTo) : data.specialEventTo;
            _this.to = (typeof data.specialEventTo == 'string') ? formatTime12(data.specialEventTo) : '';
            _this.statusId = data.statusId;
            _this.url = data.url;
            console.log(_this);
        };
        _this.update = function () {
            var data = {
                "institutionId": _this.institutionId,
                "title": _this.title,
                "description": _this.description,
                "specialEventDay": dateToString(_this.specialEventDay),
                "specialEventFrom": timeToString(_this.specialEventFrom),
                "specialEventTo": timeToString(_this.specialEventTo),
                "originalImageId": (_this.originalImage.id) ? _this.originalImage.id : 0,
                "thumbImageId": null,
                "statusId": _this.statusId,
                "url": _this.url
            };
            var sr = {
                method: 'PUT',
                url: serviceRoot + "specialevent/" + _this.id,
                data: data,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Evento actualizad0', 'success');
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
                "specialEventDay": dateToString(_this.specialEventDay),
                "specialEventFrom": timeToString(_this.specialEventFrom),
                "specialEventTo": timeToString(_this.specialEventTo),
                "originalImageId": (_this.originalImage.id) ? _this.originalImage.id : 0,
                "thumbImageId": null,
                "url": _this.url
            };
            var sr = {
                method: 'POST',
                url: serviceRoot + "specialevent",
                data: create,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Evento registrado!!!', 'success');
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
                url: serviceRoot + "specialevent/" + _this.id,
                data: null,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Evento Eliminado!!!', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Success', 'El evento no se puede eliminar!!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.id = 0;
        _this.title = '';
        _this.description = '';
        _this.originalImage = new Imagen(http, q, 'original', userTypeId);
        _this.specialEventDay = new Date();
        _this.specialEventFrom = formatTime('00:00');
        _this.specialEventTo = formatTime('00:00');
        _this.url = '';
        _this.from = '';
        _this.to = '';
        _this.day = '';
        _this.desc = '';
        return _this;
    }
    return SpecialEvent;
}(ModelService));
