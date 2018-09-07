"use strict";
var UserPerfilList = (function () {
    function UserPerfilList(angular) {
        var _this = this;
        this.getList = function () {
            return _this.angular.http.get(serviceRoot + 'user/institution');
        };
        this.angular = angular;
        this.list = [];
    }
    return UserPerfilList;
}());
