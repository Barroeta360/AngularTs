"use strict";
var LoginController = (function () {
    function LoginController(angular) {
        var _this = this;
        this.buttonModalLadda = false;
        this.validateLogin = function () {
            var c = readCookie('type');
            if (c || c != '') {
                _this.angular.window.location.href = '#/home';
            }
        };
        this.changePassword = function () {
            _this.user.changePassword().then(function (value) {
                _this.angular.window.location.href = '#/login';
            });
        };
        this.login = function () {
            _this.user.login().then(function (value) {
                console.log(value);
                _this.angular.ss.user = value;
                createCookie('  type', value.user.type, 1);
                createCookie('htkn', value.token, 1);
                if (value.user.type == 2)
                    _this.angular.window.location.href = '#/home';
                if (value.user.type == 1)
                    _this.angular.window.location.href = '#/promo';
            }).catch(function (reason) {
                console.log(reason);
            });
        };
        this.recoverPassword = function () {
            console.log(_this.user);
            _this.user.recoverPassword().then(function (value) {
            }).catch(function (reason) {
                console.log(reason);
            });
        };
        this.sendMail = function () {
            _this.user.register().then(function (value) {
                console.log(value);
                _this.angular.window.location.href = '#/login';
            }).catch(function (reason) {
                console.log(reason);
            });
        };
        this.createUser = function () {
            _this.user.create().then(function (value) {
                console.log(value);
                _this.angular.window.location.href = '#/login';
            }).catch(function (reason) {
                console.log(reason);
            });
        };
        this.createClient = function () {
            _this.createUser();
            console.log(_this.user.client);
        };
        this.formatPhone = function (n, ele) {
            var e;
            var el = document.getElementById(n);
            if (el) {
                e = getElementById(n);
            }
            console.log(e);
            var size = e.length;
            switch (size) {
                case 3:
                    el.value = e + '-';
                    break;
                case 7:
                    el.value = e + '.';
                    break;
                case 10:
                    el.value = e + '.';
                    break;
                default:
                    break;
            }
        };
        this.angular = angular;
        this.modalId = 'login-modal';
        this.user = new User(this.angular.http, this.angular.q);
        var state = window.location.hash.replace('#', '').split('?')[0];
        if (!pathData && (state == '/newuser' || state == '/newpassword')) {
            this.angular.window.location.href = '#/login';
        }
        else if (state == '/newuser' || state == '/newpassword') {
            this.user.token = pathData.split(';')[0];
            this.user.email = pathData.split(';')[1];
        }
        this.validateLogin();
    }
    return LoginController;
}());
