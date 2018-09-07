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
var DailySpecial = (function (_super) {
    __extends(DailySpecial, _super);
    function DailySpecial(http, q, institutionId) {
        var _this = _super.call(this, http, q) || this;
        _this.institutionId = institutionId;
        _this.get = function () {
            var sr = {
                method: 'GET',
                url: serviceRoot + "specialdaily/" + _this.institutionId,
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
                url: serviceRoot + "specialdaily",
                data: {
                    "institutionId": _this.institutionId,
                    "title": _this.title,
                    "description": _this.description,
                    "selectedMonday": (_this.selectedMonday) ? 1 : 0,
                    "selectedTuesday": (_this.selectedTuesday) ? 1 : 0,
                    "selectedWednesday": (_this.selectedWednesday) ? 1 : 0,
                    "selectedThursday": (_this.selectedThursday) ? 1 : 0,
                    "selectedFriday": (_this.selectedFriday) ? 1 : 0,
                    "selectedSaturday": (_this.selectedSaturday) ? 1 : 0,
                    "selectedSunday": (_this.selectedSunday) ? 1 : 0,
                    "specialDailyFrom": (typeof _this.specialDailyFrom == 'string') ? _this.specialDailyFrom : timeToString(_this.specialDailyFrom),
                    "specialDailyTo": (typeof _this.specialDailyTo == 'string') ? _this.specialDailyTo : timeToString(_this.specialDailyTo)
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Daily Special registrado!!!', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'El Daily Special no se han podido crear\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            console.log(sr);
            return _this.httpRequest(sr);
        };
        _this.set = function (data) {
            console.log(data);
            if (data) {
                _this.id = data.id;
                _this.statusId = data.statusId;
                if (data.institutionId) {
                    _this.institutionId = data.institutionId;
                }
                _this.title = data.title;
                _this.description = data.description;
                _this.selectedMonday = (data.selectedMonday == 1) ? true : false;
                _this.selectedTuesday = (data.selectedTuesday == 1) ? true : false;
                _this.selectedWednesday = (data.selectedWednesday == 1) ? true : false;
                _this.selectedThursday = (data.selectedThursday == 1) ? true : false;
                _this.selectedFriday = (data.selectedFriday == 1) ? true : false;
                _this.selectedSaturday = (data.selectedSaturday == 1) ? true : false;
                _this.selectedSunday = (data.selectedSunday == 1) ? true : false;
                _this.specialDailyFrom = (typeof data.specialDailyFrom == 'string') ? formatTime(data.specialDailyFrom) : data.specialDailyFrom;
                _this.specialDailyTo = (typeof data.specialDailyTo == 'string') ? formatTime(data.specialDailyTo) : data.specialDailyTo;
            }
            console.log(_this);
        };
        _this.update = function () {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "specialdaily/" + _this.id,
                data: {
                    "statusId": _this.statusId,
                    "institutionId": _this.institutionId,
                    "title": _this.title,
                    "description": _this.description,
                    "selectedMonday": (_this.selectedMonday) ? 1 : 0,
                    "selectedTuesday": (_this.selectedTuesday) ? 1 : 0,
                    "selectedWednesday": (_this.selectedWednesday) ? 1 : 0,
                    "selectedThursday": (_this.selectedThursday) ? 1 : 0,
                    "selectedFriday": (_this.selectedFriday) ? 1 : 0,
                    "selectedSaturday": (_this.selectedSaturday) ? 1 : 0,
                    "selectedSunday": (_this.selectedSunday) ? 1 : 0,
                    "specialDailyFrom": (typeof _this.specialDailyFrom == 'string') ? _this.specialDailyFrom : timeToString(_this.specialDailyFrom),
                    "specialDailyTo": (typeof _this.specialDailyTo == 'string') ? _this.specialDailyTo : timeToString(_this.specialDailyTo)
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Daily Special Actualizados', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'El Daily Special no se han podido Actualizar\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            JSON.stringify(sr.data);
            return _this.httpRequest(sr);
        };
        _this.delete = function () {
            var sr = {
                method: 'DELETE',
                url: serviceRoot + "specialdaily/" + _this.id,
                data: null,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Daily Special Eliminados!!!', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'El Daily Special no se han podido Eliminar\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.getTime = function (from, to) {
            var time = formatTime12(from) + " - " + formatTime12(to);
            return time;
        };
        _this.getStringDates = function (ds) {
            var d = '';
            var da = [];
            if (ds.selectedMonday == 1) {
                da.push('Lunes');
            }
            if (ds.selectedTuesday == 1) {
                da.push('Martes');
            }
            if (ds.selectedWednesday == 1) {
                da.push('Miercoles');
            }
            if (ds.selectedThursday == 1) {
                da.push('Jueves');
            }
            if (ds.selectedFriday == 1) {
                da.push('Viernes');
            }
            if (ds.selectedSaturday == 1) {
                da.push('Sabado');
            }
            if (ds.selectedSunday == 1) {
                da.push('Domingo');
            }
            d = da.join(' - ');
            return d;
        };
        _this.title = '';
        _this.description = '';
        _this.selectedMonday = 0;
        _this.selectedTuesday = 0;
        _this.selectedWednesday = 0;
        _this.selectedThursday = 0;
        _this.selectedFriday = 0;
        _this.selectedSaturday = 0;
        _this.selectedSunday = 0;
        _this.specialDailyFrom = formatTime('00:00');
        _this.specialDailyTo = formatTime('00:00');
        return _this;
    }
    return DailySpecial;
}(ModelService));
