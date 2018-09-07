"use strict";
project.controller('main', function () {
    var _this = this;
    this.showModal = function (id) {
        $(id).modal('show');
    };
    this.go = function (state) {
        angularServices.window.href = "#" + state;
    };
    this.console = function (any) {
        console.log(any);
    };
    this.functions = new Object();
    this.functions.dias = new Days();
    this.functions.formatDate12 = formatDate12;
    this.functions.formatTime12 = formatTime12;
    this.functions.clearCache = function () {
        angularServices.ss.$reset();
    };
    this.rs = angularServices.rs;
    this.init = function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        closeModal('#menuModal');
        $('.tooltip').remove();
        var myHash = window.location.hash.replace('#', '').split('?');
        if (myHash[0] == '/login') {
            _this.rs.showComponent = false;
        }
        else {
            _this.rs.showComponent = true;
        }
        pathData = myHash[1];
        switch (myHash[0]) {
            case '/home':
                _this.app = new IndexController(angularServices);
                break;
            case '/login':
                _this.app = new LoginController(angularServices);
                break;
            case '/test':
                break;
            default:
        }
        ;
    };
});
