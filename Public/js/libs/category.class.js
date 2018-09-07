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
var Category = (function (_super) {
    __extends(Category, _super);
    function Category(http, q, userType) {
        var _this = _super.call(this, http, q) || this;
        _this.userType = userType;
        _this.set = function (data) {
            console.log(data);
            _this.id = data.id;
            _this.statusId = data.statusId;
            _this.categoryTitle = data.categoryTitle;
            _this.categoryTypeId = data.categoryTypeId;
            _this.image.id = (data.originalImageId) ? data.originalImageId : 0;
            _this.image.contentBase64 = (data.originalImageId) ? routeImg + data.originalImage : '';
            _this.imagePin.id = (data.originalPinImageId) ? data.originalPinImageId : 0;
            _this.imagePin.contentBase64 = (data.originalPinImageId) ? routeImg + data.pinImage : '';
        };
        _this.update = function () {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "category/" + _this.id,
                data: {
                    "categoryTypeId": _this.categoryTypeId,
                    "categoryTitle": _this.categoryTitle,
                    "originalImageId": (_this.image.id > 0) ? _this.image.id : null,
                    "originalPinImageId": (_this.imagePin.id > 0) ? _this.imagePin.id : null,
                    "statusId": _this.statusId
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Categoría actualizada', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('¡Oops!', 'La categoría no se ha podido actualizar\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.create = function () {
            var sr = {
                method: 'POST',
                url: serviceRoot + "category",
                data: {
                    "categoryTypeId": _this.categoryTypeId,
                    "categoryTitle": _this.categoryTitle,
                    "originalImageId": (_this.image.id > 0) ? _this.image.id : null,
                    "originalPinImageId": (_this.imagePin.id > 0) ? _this.imagePin.id : null
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Categoría registrada!!!', 'success');
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
                url: serviceRoot + "category/" + _this.id,
                data: null,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Categoría Eliminada!!!', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Success', 'La categoría no se puede eliminar!!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.categoryTitle = "";
        _this.categoryTypeId = 1;
        _this.image = new Imagen(http, q, 'original', _this.userType);
        _this.imagePin = new Imagen(http, q, 'pin', _this.userType);
        return _this;
    }
    return Category;
}(ModelService));
