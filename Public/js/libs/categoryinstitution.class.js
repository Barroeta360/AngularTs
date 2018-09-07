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
var CategoryInstitution = (function (_super) {
    __extends(CategoryInstitution, _super);
    function CategoryInstitution(http, q, userTypeId, institutionId) {
        var _this = _super.call(this, http, q) || this;
        _this.userTypeId = userTypeId;
        _this.institutionId = institutionId;
        _this.add = function () {
            var create = {
                "institutionId": _this.institutionId,
                "categoryId": _this.categoryId,
            };
            var sr = {
                method: 'POST',
                url: serviceRoot + "categoryinstitution",
                data: create,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Categoria asociada!!!', 'success');
                    return data;
                },
                error: function (error) {
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.remove = function () {
            var sr = {
                method: 'DELETE',
                url: serviceRoot + "categoryinstitution/" + _this.id,
                data: null,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Categoria removida!!!', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Success', 'La categoria no se puede remover!!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.categoryId = 0;
        _this.id = 0;
        return _this;
    }
    return CategoryInstitution;
}(ModelService));
