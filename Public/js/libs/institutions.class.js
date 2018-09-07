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
var InstitutionsList = (function (_super) {
    __extends(InstitutionsList, _super);
    function InstitutionsList(url, userId) {
        var _this = _super.call(this, url) || this;
        _this.userId = userId;
        return _this;
    }
    return InstitutionsList;
}(ArrayList));
var Institutions = (function (_super) {
    __extends(Institutions, _super);
    function Institutions(angular, userId, typeId) {
        if (userId === void 0) { userId = 0; }
        var _this = _super.call(this, angular.http, angular.q) || this;
        _this.angular = angular;
        _this.userId = userId;
        _this.typeId = typeId;
        _this.update = function () {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "institution/" + _this.id,
                data: {
                    "userId": _this.userId,
                    "statusId": _this.statusId,
                    "planId": _this.planId
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Institucion Actualizada', 'success');
                    return data;
                },
                error: function (error) {
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.create = function () {
            var $http = _this.http;
            var $q = _this.q;
            var $d = $q.defer();
            var $p = $d.promise;
            function error(reason) {
                console.log(reason);
                swAlert('Error!!', 'La institucion no se creo!!!', 'error');
                $d.reject(reason);
            }
            _this.createInstitutions().then(function (value) {
                console.log(value);
                _this.id = value.id;
                _this.profileId = value.profileId;
                _this.locationId = value.locationId;
                _this.planId = value.statusId;
                _this.updateProfile().then(function (value) {
                    $d.resolve(value);
                }).catch(function (reason) {
                    error(reason);
                    _this.delete(0);
                });
            }).catch(error);
            return $p;
        };
        _this.createInstitutions = function () {
            var sr = {
                method: 'POST',
                url: serviceRoot + "institution",
                data: {
                    "userId": _this.userId,
                    "planId": _this.planId
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
        _this.set = function (data) {
            console.log(data);
            _this.id = data.id;
            _this.statusId = data.statusId;
            _this.profileId = data.profileId;
            _this.planId = data.planId;
            if (data.hasProfile) {
                _this.setProfile(data);
            }
            if (data.planId > 0) {
                _this.setPlan(data);
            }
        };
        _this.createPlan = function () {
            var sr = {
                method: 'POST',
                url: serviceRoot + "institutionstatus",
                data: {
                    "institutionId": _this.id,
                    "planId": _this.planId,
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
        _this.updatePlan = function () {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "institutionstatus/" + _this.profileId,
                data: {
                    "institutionId": _this.id,
                    "name": _this.name,
                    "phone": _this.phone,
                    "email": _this.email,
                    "website": _this.website,
                    "facebookLink": _this.facebookLink,
                    "twitterLink": _this.twitterLink,
                    "instagramLink": _this.instagramLink,
                    "linkedinLink": _this.linkedinLink,
                    "description": _this.stringD,
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
        _this.setPlan = function (i) {
            _this.planId = i.planId;
            _this.subscriptionDate = i.subscriptionDate;
            _this.expirationDate = i.expirationDate;
            _this.carouselCount = i.carouselCount;
            _this.dailyCount = i.dailyCount;
            _this.eventCount = i.eventCount;
            _this.promotionCount = i.promotionCount;
        };
        _this.getPlan = function () {
            var sr = {
                method: 'GET',
                url: serviceRoot + "institutionstatus/" + _this.id,
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
        _this.createProfile = function () {
            var sr = {
                method: 'POST',
                url: serviceRoot + "institutionprofile",
                data: {
                    "institutionId": _this.id,
                    "name": _this.name,
                    "phone": _this.phone,
                    "email": _this.email,
                    "website": _this.website,
                    "facebookLink": _this.facebookLink,
                    "twitterLink": _this.twitterLink,
                    "instagramLink": _this.instagramLink,
                    "linkedinLink": _this.linkedinLink,
                    "description": _this.description
                },
                header: null,
                success: function (data) {
                    swAlert('Success', 'Institucion Creada', 'success');
                    return data;
                },
                error: function (error) {
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.updateProfile = function () {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "institutionprofile/" + _this.profileId,
                data: {
                    "institutionId": _this.id,
                    "name": _this.name,
                    "phone": _this.phone,
                    "email": _this.email,
                    "website": _this.website,
                    "facebookLink": _this.facebookLink,
                    "twitterLink": _this.twitterLink,
                    "instagramLink": _this.instagramLink,
                    "linkedinLink": _this.linkedinLink,
                    "description": _this.stringD,
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
        _this.setProfile = function (i) {
            _this.hasProfile = true;
            _this.name = i.name;
            _this.address = i.address;
            _this.phone = i.phone;
            _this.website = i.website;
            _this.email = i.email;
            _this.facebookLink = i.facebookLink;
            _this.twitterLink = i.twitterLink;
            _this.instagramLink = i.instagramLink;
            _this.linkedinLink = i.linkedinLink;
            _this.description = i.description;
        };
        _this.getInstitutionProfile = function () {
            var sr = {
                method: 'GET',
                url: serviceRoot + "institutionprofile/" + _this.id,
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
        _this.createStart = function () {
            _this.stars = [];
            for (var i = 0; i < _this.calification; i++) {
                _this.stars[i] = i;
            }
        };
        _this.getTags = function (id) {
            _this.tags = new ArrayList('');
        };
        _this.getAddress = function () {
            var sr = {
                method: 'GET',
                url: serviceRoot + "institutionlocation/" + _this.id,
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
        _this.updateAddress = function () {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "institutionlocation/" + _this.locationId,
                data: {
                    "institutionId": _this.id,
                    "address": _this.address,
                    "countryId": _this.country,
                    "stateId": _this.state,
                    "cityId": _this.city,
                    "latitude": ("" + _this.latitude).toString(),
                    "longitude": ("" + _this.longitude).toString(),
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
        _this.saveAddress = function () {
            var sr = {
                method: 'POST',
                url: serviceRoot + "institutionlocation",
                data: {
                    "institutionId": _this.id,
                    "address": _this.address,
                    "countryId": _this.country,
                    "stateId": _this.state,
                    "cityId": _this.city,
                    "latitude": ("" + _this.latitude).toString(),
                    "longitude": ("" + _this.longitude).toString()
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
        _this.setAddress = function (d) {
            _this.address = (d.address) ? d.address : '';
            _this.locationId = d.id;
            _this.country = d.countryId;
            _this.state = d.stateId;
            _this.city = d.cityId;
            _this.latitude = d.latitude;
            _this.longitude = d.longitude;
        };
        _this.delete = function (msjF) {
            if (msjF === void 0) { msjF = 1; }
            var sr = {
                method: 'DELETE',
                url: serviceRoot + "institution/" + _this.id,
                data: null,
                header: null,
                success: function (data) {
                    if (msjF == 1) {
                        swAlert('Success', 'Institucion Eliminada!!!', 'success');
                    }
                    return data;
                },
                error: function (error) {
                    if (msjF == 1) {
                        swAlert('Opps!!', 'La institucion no se puede eliminar!!!', 'error');
                    }
                    return error;
                }
            };
            return _this.httpRequest(sr);
        };
        _this.upImage = function (id) {
            var sr = {
                method: 'POST',
                url: serviceRoot + "institutioncarousel",
                data: {
                    "institutionId": _this.id,
                    "originalImageId": id,
                    "thumbImageId": null,
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
        _this.removeImage = function (id) {
            var sr = {
                method: 'DELETE',
                url: serviceRoot + "institutioncarousel/" + id,
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
        _this.updateImageStatus = function (image, status) {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "institutioncarousel/" + image.id,
                data: {
                    "institutionId": _this.id,
                    "originalImageId": image.originalImageId,
                    "thumbImageId": null,
                    "statusId": status
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
        _this.createHeader = function (id) {
            var sr = {
                method: 'POST',
                url: serviceRoot + "institutionheader",
                data: {
                    "institutionId": _this.id,
                    "originalImageId": id,
                    "thumbImageId": null,
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
        _this.UpdateHeader = function (id) {
            var sr = {
                method: 'PUT',
                url: serviceRoot + "institutionheader/" + _this.headerId,
                data: {
                    "institutionId": _this.id,
                    "originalImageId": id,
                    "thumbImageId": null,
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
        _this.getHeader = function () {
            var sr = {
                method: 'GET',
                url: serviceRoot + "institutionheader/" + _this.id,
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
        _this.description = '';
        _this.name = '';
        _this.tags = new ArrayList('tags');
        _this.phone = '-()--';
        _this.isSponsored = false;
        _this.isOnline = false;
        _this.membership = new Membership(angular.http, angular.q, 0);
        _this.calification = 0;
        _this.facebookLink = '';
        _this.twitterLink = '';
        _this.instagramLink = '';
        _this.linkedinLink = '';
        _this.email = '';
        _this.website = '';
        _this.address = '';
        _this.country = 0;
        _this.state = 0;
        _this.city = 0;
        _this.hasProfile = false;
        _this.profileId = 0;
        _this.stringD = '';
        _this.latitude = 0;
        _this.longitude = 0;
        _this.locationId = 0;
        _this.imageHeader = new Imagen(angular.http, angular.q, 'original', _this.typeId);
        _this.headerId = 0;
        _this.planId = 0;
        _this.subscriptionDate = new Date();
        _this.expirationDate = new Date();
        _this.carouselCount = 0;
        _this.dailyCount = 0;
        _this.eventCount = 0;
        _this.promotionCount = 0;
        _this.distance = 0;
        return _this;
    }
    return Institutions;
}(ModelService));
