"use strict";
var path = window.location.search.replace('?', '');
var pathData;
var angularServices;
var load;
var dataUrl;
var loc;
var routeImg = 'http://www.waychile.cl';
var Days = (function () {
    function Days() {
        var _this = this;
        this.list = [
            { dia: "Lunes", id: 1 },
            { dia: "Martes", id: 2 },
            { dia: "Miercoles", id: 3 },
            { dia: "Jueves", id: 4 },
            { dia: "Viernes", id: 5 },
            { dia: "Sabado", id: 6 },
            { dia: "Domingo", id: 7 },
        ];
        this.getDayDesc = function (id) {
            return _this.list[id].dia;
        };
    }
    return Days;
}());
var swAlert = function (title, message, type) {
    return swal({
        title: title,
        text: message,
        icon: type,
        buttons: false,
        dangerMode: true,
    });
};
var swConfirm = function (title, message, type, cancel) {
    if (type === void 0) { type = 'warning'; }
    if (cancel === void 0) { cancel = true; }
    return swal({
        title: title,
        text: message,
        icon: type,
        buttons: {
            cancel: {
                text: "Cancelar",
                value: false,
                visible: cancel,
                className: "",
                closeModal: true,
            },
            confirm: {
                text: "Confirmar",
                value: true,
                visible: true,
                className: "",
                closeModal: true
            }
        },
        dangerMode: true,
    });
};
var closeModal = function (id) {
    $(id).modal('hide');
    $('.modal-backdrop').remove();
};
var openModal = function (id) {
    $(id).modal('show');
};
var assembleTable = function (id) {
    if (id === void 0) { id = ''; }
    $(document).ready(function () {
        setTimeout(function () {
            $('select').addClass('form-control');
        }, 100);
    });
};
$(document).ready(function () {
    $('.mbd-select').material_select();
});
var pad = function (n, width, z) {
    if (z === void 0) { z = 0; }
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};
var formatDate12 = function (hour) {
    var lh = hour.split(':')[0];
    var lm = hour.split(':')[1];
    var h = parseInt(lh);
    var t;
    var ft;
    if (h > 12) {
        t = 'PM';
        h = h - 12;
        lh = "" + h;
        lh = pad(lh, 2, '0');
    }
    else {
        t = 'AM';
    }
    lm = pad(lm, 2, '0');
    ft = lh + ":" + lm + " " + t;
    return ft;
};
var formatTime12 = function (hour) {
    var lh;
    var lm;
    if (typeof hour == 'string') {
        lh = hour.split(':')[0];
        lm = hour.split(':')[1];
    }
    else {
        lh = "" + hour.getHours();
        lm = "" + hour.getMinutes();
    }
    var h = parseInt(lh);
    var t;
    var ft;
    if (h >= 12) {
        t = 'PM';
        if (h > 12)
            h = h - 12;
        lh = "" + h;
    }
    else {
        t = 'AM';
    }
    lh = pad(lh, 2, '0');
    lm = pad(lm, 2, '0');
    ft = lh + ":" + lm + " " + t;
    return ft;
};
var formatImage = function (id) {
    var myImg = $("#" + id).css('background-image');
    if (myImg.indexOf('url(')) {
        myImg = myImg.replace(/^url\(['"](.+)['"]\)/, '$1');
    }
    return myImg;
};
var formatUrl = function (data) {
    var myImg = data;
    myImg = myImg.replace(/^url\(['"](.+)['"]\)/, '$1');
    myImg = (myImg.indexOf("data:image") >= 0) ? myImg : '';
    return myImg;
};
var nameImage = function (id) {
    var jId = document.getElementById(id);
    if (jId.files && jId.files.length > 0) {
        return jId.files[0].name;
    }
    else {
        return null;
    }
};
var cleanBG = function (id) {
    $("#" + id).css('background-image', 'none');
};
var dateToString = function (date) {
    var stringDate;
    var y = date.getFullYear().toString();
    var m = pad((1 + date.getUTCMonth()).toString(), 2);
    var d = pad(date.getUTCDate().toString(), 2);
    stringDate = y + "-" + m + "-" + d;
    return stringDate;
};
var formatDate = function (date) {
    if (angular.isString(date)) {
        var d = date.split('-');
        return new Date(parseInt(d[0]), parseInt(d[1]), parseInt(d[2]));
    }
    else if (angular.isDate(date)) {
        return new Date(date);
    }
    else {
        return new Date();
    }
};
var replaceAll = function (anyVar, from, to) {
    var newVar = anyVar.split(from).join(to);
    return newVar;
};
var formatTime = function (hour) {
    return new Date(1970, 0, 1, parseInt(hour.split(':')[0]), parseInt(hour.split(':')[1]), 0);
};
var timeToString = function (time) {
    var hour = new String(time.getHours());
    var minutes = new String(time.getMinutes());
    hour = pad(hour, 2);
    minutes = pad(minutes, 2);
    return hour + ":" + minutes + ":00";
};
var toInt = function (a) {
    return parseInt(a);
};
var getKilometros = function (lat1, lon1, lat2, lon2) {
    var rad = function (x) { return x * Math.PI / 180; };
    var R = 6378.137;
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return parseFloat(d.toFixed(3));
};
var createCookie = function (name, value, time, hourOrDay) {
    if (time === void 0) { time = 1; }
    if (hourOrDay === void 0) { hourOrDay = 'd'; }
    var d = new Date();
    var str = name + "=" + value + ";";
    if (hourOrDay = 'd') {
        d.setDate(d.getDate() + time);
    }
    else {
        d.setHours(d.getHours() + time);
    }
    str += "expires=" + d.toUTCString();
    document.cookie = str;
};
var readCookie = function (name) {
    var cookies = document.cookie.split(';');
    var myCookie = '';
    cookies.forEach(function (c) {
        c = c.split('=');
        c[0] = c[0].trim();
        if (c[0] == name) {
            myCookie = c[1];
        }
    });
    return myCookie;
};
var deleteCookie = function (name) {
    var cookies = document.cookie.split(';');
    cookies.forEach(function (c) {
        c = c.split('=');
        c[0] = c[0].trim();
        if (c[0] == name) {
            var d = new Date();
            var str = name + "=;";
            d.setFullYear(d.getFullYear() - 1);
            str += "expires=" + d.toUTCString();
            document.cookie = str;
        }
    });
};
var dateToText = function (date) {
    var stringDate;
    var y = date.getFullYear().toString();
    var m = pad((1 + date.getUTCMonth()).toString(), 2);
    var d = pad(date.getUTCDate().toString(), 2);
    stringDate = y + "-" + m + "-" + d;
    return stringDate;
};
var getElementById = function (id) {
    return (document.getElementById(id)) ? document.getElementById(id).value : '';
};
