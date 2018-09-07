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
var HourList = (function (_super) {
    __extends(HourList, _super);
    function HourList(url, institutionId) {
        var _this = _super.call(this, url) || this;
        _this.institutionId = institutionId;
        _this.getList = function () {
            var sr = {
                method: 'GET',
                url: serviceRoot + "institutionschedule/" + _this.institutionId,
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
        _this.selectstartTimeList = function (index) {
            return _this.list[index];
        };
        _this.push = function (hour) {
            _this.list.push(hour);
            _this.angular.ss.institutions.hourList = _this.list;
        };
        _this.modify = function (hour, index) {
            _this.list[index] = hour;
            _this.angular.ss.institutions.hourList = _this.list;
        };
        _this.delete = function (index) {
            var $q = _this.angular.q;
            var $d = $q.defer();
            var $p = $d.promise;
            _this.list.splice(index, 1);
            _this.angular.ss.institutions.hourList = _this.list;
            $d.resolve(_this.list);
            return $p;
        };
        _this.hour = new Hour(_this.http, _this.q, institutionId);
        return _this;
    }
    return HourList;
}(ArrayList));
var Hour = (function (_super) {
    __extends(Hour, _super);
    function Hour(http, q, institutionId) {
        var _this = _super.call(this, http, q) || this;
        _this.institutionId = institutionId;
        _this.set = function (data) {
            _this.hourId = data.hourId;
            _this.dayId = data.dayId;
            _this.startTime = data.startTime;
            _this.endTime = data.endTime;
            _this.id = data.id;
        };
        _this.formatTime = function (hour) {
            return new Date(1970, 0, 1, parseInt(hour.split(':')[0]), parseInt(hour.split(':')[1]), 0);
        };
        _this.timeToString = function (time) {
            var hour = new String(time.getHours());
            var minutes = new String(time.getMinutes());
            hour = pad(hour, 2);
            minutes = pad(minutes, 2);
            return hour + ":" + minutes + ":00";
        };
        _this.create = function () {
            var sr = {
                method: 'POST',
                url: serviceRoot + "institutionschedule",
                data: {
                    "institutionId": _this.institutionId,
                    "dayId": _this.dayId,
                    "startTime": _this.timeToString(_this.startTime),
                    "endTime": _this.timeToString(_this.endTime)
                },
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
                url: serviceRoot + "institutionschedule/" + _this.id,
                data: {
                    "institutionId": _this.institutionId,
                    "dayId": _this.dayId,
                    "startTime": _this.timeToString(_this.startTime),
                    "endTime": _this.timeToString(_this.endTime),
                    "statusId": 1
                },
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
        _this.delete = function () {
            var sr = {
                method: 'DELETE',
                url: serviceRoot + "institutionschedule/" + _this.id,
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
        _this.hourId = 0;
        _this.dayId = 0;
        _this.startTime = _this.formatTime('00:00');
        _this.endTime = _this.formatTime('00:00');
        return _this;
    }
    return Hour;
}(ModelService));
