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
var UserList = (function (_super) {
    __extends(UserList, _super);
    function UserList(angular) {
        var _this = _super.call(this, angular) || this;
        _this.pushUser = function (user) {
            _this.listUserClient.push(user);
        };
        _this.getHttp = function () {
            return _this.angular.http.get(serviceRoot + "user");
        };
        _this.get = function () {
            var sr = {
                method: 'GET',
                url: serviceRoot + "user",
                data: null,
                header: null,
                success: function (data) {
                    return data;
                },
                error: function (error, status) {
                    var data = {
                        error: error,
                        status: status
                    };
                    return data;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.listUserClient = new Array();
        _this.list = new Array();
        return _this;
    }
    return UserList;
}(ConsumeService));
var User = (function (_super) {
    __extends(User, _super);
    function User(http, q) {
        var _this = _super.call(this, http, q) || this;
        _this.set = function (data) {
            if (data) {
                _this.email = data.email;
                _this.id = data.id;
                _this.statusId = data.statusId;
                _this.typeId = data.typeId;
            }
        };
        _this.getUserById = function (id) {
            var sr = {
                method: 'GET',
                url: serviceRoot + "user/" + id,
                data: null,
                header: null,
                success: function (data) {
                    return data;
                },
                error: function (error, status) {
                    var data = {
                        error: error,
                        status: status
                    };
                    return data;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.setClient = function (data) {
            _this.client.set(data);
        };
        _this.login = function () {
            var sr = {
                method: 'POST',
                url: serviceRoot + "user/login",
                data: {
                    "email": _this.email,
                    "password": _this.password
                },
                header: null,
                success: function (data) {
                    console.log(data);
                    return data;
                },
                error: function (error) {
                    swAlert('Invalido', 'Usuario o clave invalida', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.recoverPassword = function () {
            var sr = {
                method: 'POST',
                url: serviceRoot + "user/recover",
                data: {
                    "email": _this.email
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'La clave ha sido enviado a su correo', 'success');
                    _this.email = '';
                    return data;
                },
                error: function (error) {
                    swAlert('Error', 'La clave no se pudo reenviar a su correo\ntrate nuevamente', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.changePassword = function () {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "user/password",
                data: {
                    "email": _this.email,
                    "password": _this.password,
                    "token": _this.token
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Clave actualizada', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Error', 'La clave no ha actualizada\ntrate nuevamente', 'error');
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.update = function () {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "user/" + _this.id,
                data: {
                    "typeId": _this.typeId,
                    "statusId": _this.statusId
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
        _this.create = function () {
            var sr = {
                method: 'POST',
                url: serviceRoot + "user/register",
                data: {
                    "user": {
                        "email": _this.email,
                        "type": _this.typeId,
                        "password": _this.password,
                        "token": _this.token
                    },
                    "userProfile": {
                        "name": _this.client.name,
                        "lastname": _this.client.lastname,
                        "DNI": _this.client.dni,
                        "civilStatus": _this.client.civilStatus,
                        "address": _this.client.zone,
                        "genre": _this.client.genre,
                        "birthday": _this.client.birthday,
                        "childQuantity": _this.client.childQuantity,
                        "notification": _this.client.notification,
                        "phone_1": getElementById('local'),
                        "phone_2": getElementById('cel')
                    }
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Usuario registrado!!!', 'success');
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'El Usuario no se ha podido crear\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            console.log(sr);
            return _this.httpRequest(sr);
        };
        _this.register = function () {
            var sr = {
                method: 'POST',
                url: serviceRoot + "user/preregister",
                data: {
                    "email": _this.email
                },
                header: null,
                success: function (data) {
                    return data;
                },
                error: function (error) {
                    swAlert('Oops', 'El Correo no se ha podido enviar\n trate nuevamente !!!', 'error');
                    return error;
                }
            };
            console.log(sr);
            return _this.httpRequest(sr);
        };
        _this.delete = function () {
            var sr = {
                method: 'DELETE',
                url: serviceRoot + "user/" + _this.id,
                data: null,
                header: null,
                success: function (data) {
                    swAlert('Success', 'Usuario inhabilitado!!!', 'success');
                    return data;
                },
                error: function (error) {
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.email = '';
        _this.typeId = 1;
        _this.password = '';
        _this.password2 = '';
        _this.token = '';
        _this.client = new Client(http, q);
        return _this;
    }
    return User;
}(ModelService));
