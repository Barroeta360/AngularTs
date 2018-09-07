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
var IndexController = (function (_super) {
    __extends(IndexController, _super);
    function IndexController(angular) {
        if (angular === void 0) { angular = angularServices; }
        var _this = _super.call(this, angular) || this;
        console.log('i run');
        deleteCookie('test');
        _this.test = readCookie('test');
        return _this;
    }
    return IndexController;
}(Controller));
