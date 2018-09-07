class InstitutionsList extends ArrayList {
    constructor(url: string, private userId: number) {
        super(url);
    }
}



class Institutions extends ModelService {
    /*
    * Profile
    */
    name: string;
    description: string;
    phone: string;
    address: string;
    website: string;
    facebookLink: string;
    twitterLink: string;
    instagramLink: string;
    linkedinLink: string;
    email: string;
    hasProfile: boolean;
    profileId: number;
    stringD: string;
    

    distance: number;


    tags: ArrayList;
    isSponsored: boolean;
    isOnline: boolean;
    membership: Membership;
    calification: number;
    stars: any;
    city: number;
    state: number;
    country: number;

    latitude: number;
    longitude: number;
    locationId: number;

    imageHeader: Imagen;
    headerId: number;

    planId: number;
    carouselCount: number;
    subscriptionDate: Date;
    expirationDate: Date;
    dailyCount: number;
    eventCount: number;
    promotionCount: number;


    constructor(public angular: angularServices, public userId: number = 0, public typeId: number) {
        super(angular.http, angular.q);
        this.description = '';
        this.name = '';
        this.tags = new ArrayList('tags');
        this.phone = '-()--';
        this.isSponsored = false;
        this.isOnline = false;
        this.membership = new Membership(angular.http, angular.q, 0);// editar
        this.calification = 0;
        this.facebookLink = '';
        this.twitterLink = '';
        this.instagramLink = '';
        this.linkedinLink = '';
        this.email = '';
        this.website = '';
        this.address = '';
        this.country = 0;
        this.state = 0;
        this.city = 0;
        this.hasProfile = false;
        this.profileId = 0;
        this.stringD = '';
        this.latitude = 0;
        this.longitude = 0;
        this.locationId = 0;
        this.imageHeader = new Imagen(angular.http, angular.q, 'original', this.typeId);
        this.headerId = 0;
        this.planId = 0; //fuera del set y de consumir servicio momentaneamente
        this.subscriptionDate = new Date();
        this.expirationDate = new Date();
        this.carouselCount = 0;
        this.dailyCount = 0;
        this.eventCount = 0;
        this.promotionCount = 0;
        this.distance = 0;
    }

    update = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}institution/${this.id}`,
            data: {
                "userId": this.userId,
                "statusId": this.statusId,
                "planId": this.planId
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Institucion Actualizada', 'success');
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    // Crear una institucion
    create = (): ng.IPromise<any> => {
        let $http = this.http;
        let $q = this.q;
        let $d = $q.defer();
        let $p = $d.promise;
        function error(reason: any) {
            console.log(reason);
            swAlert('Error!!', 'La institucion no se creo!!!', 'error');
            $d.reject(reason);
        }
        //Creacion de institucion
        this.createInstitutions().then((value) => {
            console.log(value)
            this.id = value.id;
            this.profileId = value.profileId;
            this.locationId = value.locationId;
            this.planId = value.statusId;
            this.updateProfile().then((value: any) => {
                $d.resolve(value);
            }).catch((reason: any) => {
                error(reason);
                this.delete(0);
            })
        }).catch(error)

        return $p;
    }

    createInstitutions = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}institution`,
            data: {
                "userId": this.userId,
                "planId": this.planId
            },
            header: null,
            success: (data: any) => {
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    set = (data: Institutions): void => {
        console.log(data);
        this.id = data.id;
        this.statusId = data.statusId;
        this.profileId = data.profileId;
        this.planId = data.planId;
        if (data.hasProfile) {
            this.setProfile(data);
        }
        if(data.planId > 0){
            this.setPlan(data);
        }
        
    }

    /*
    *plan institutions
    */

    createPlan = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}institutionstatus`,
            data: {
                "institutionId": this.id,
                "planId": this.planId,
            },
            header: null,
            success: (data: any) => {
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }


    updatePlan = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}institutionstatus/${this.profileId}`,
            data: {
                "institutionId": this.id,
                "name": this.name,
                "phone": this.phone,
                "email": this.email,
                "website": this.website,
                "facebookLink": this.facebookLink,
                "twitterLink": this.twitterLink,
                "instagramLink": this.instagramLink,
                "linkedinLink": this.linkedinLink,
                "description": this.stringD,
                "statusId": this.statusId
            },
            header: null,
            success: (data: any) => {
                //swAlert('Success', 'Institucion Actualizada', 'success');
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    setPlan = (i: Institutions): void => {
        //seteo de plan
        this.planId = i.planId;
        this.subscriptionDate = i.subscriptionDate;
        this.expirationDate = i.expirationDate;
        this.carouselCount = i.carouselCount;
        this.dailyCount = i.dailyCount;
        this.eventCount = i.eventCount;
        this.promotionCount = i.promotionCount;
    }

    getPlan = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'GET',
            url: `${serviceRoot}institutionstatus/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }


    /*
    * Institution Profile
    */
    createProfile = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}institutionprofile`,
            data: {
                "institutionId": this.id,
                "name": this.name,
                "phone": this.phone,
                "email": this.email,
                "website": this.website,
                "facebookLink": this.facebookLink,
                "twitterLink": this.twitterLink,
                "instagramLink": this.instagramLink,
                "linkedinLink": this.linkedinLink,
                "description": this.description
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Institucion Creada', 'success');
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }


    updateProfile = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}institutionprofile/${this.profileId}`,
            data: {
                "institutionId": this.id,
                "name": this.name,
                "phone": this.phone,
                "email": this.email,
                "website": this.website,
                "facebookLink": this.facebookLink,
                "twitterLink": this.twitterLink,
                "instagramLink": this.instagramLink,
                "linkedinLink": this.linkedinLink,
                "description": this.stringD,
                "statusId": this.statusId
            },
            header: null,
            success: (data: any) => {
                //swAlert('Success', 'Institucion Actualizada', 'success');
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    setProfile = (i: Institutions): void => {
        this.hasProfile = true;// indica que la institucion tiene data profile
        //seteo de profile
        this.name = i.name;
        this.address = i.address;
        this.phone = i.phone;
        this.website = i.website;
        this.email = i.email;
        this.facebookLink = i.facebookLink;
        this.twitterLink = i.twitterLink;
        this.instagramLink = i.instagramLink;
        this.linkedinLink = i.linkedinLink;
        this.description = i.description;
    }

    getInstitutionProfile = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'GET',
            url: `${serviceRoot}institutionprofile/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    /*
    * End institution Profile
    */

    createStart = (): void => {
        this.stars = [];
        for (var i = 0; i < this.calification; i++) {
            this.stars[i] = i;
        }
    }

    getTags = (id: number): void => {
        this.tags = new ArrayList('');
        //this.tags.getListByInst(this.id);
    }

    /*
    * Address
    */

    getAddress = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'GET',
            url: `${serviceRoot}institutionlocation/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    updateAddress = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}institutionlocation/${this.locationId}`,
            data: {
                "institutionId": this.id,
                "address": this.address,
                "countryId": this.country,
                "stateId": this.state,
                "cityId": this.city,
                "latitude": `${this.latitude}`.toString(),
                "longitude": `${this.longitude}`.toString(),
                "statusId": 1
            },
            header: null,
            success: (data: any) => {
                //swAlert('Success', 'Institucion Actualizada', 'success');
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }


    saveAddress = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}institutionlocation`,
            data: {
                "institutionId": this.id,
                "address": this.address,
                "countryId": this.country,
                "stateId": this.state,
                "cityId": this.city,
                "latitude": `${this.latitude}`.toString(),
                "longitude": `${this.longitude}`.toString()
            },
            header: null,
            success: (data: any) => {
                //swAlert('Success', 'Institucion Actualizada', 'success');
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    setAddress = (d: any): void => {
        this.address = (d.address) ? d.address : '';
        this.locationId = d.id;
        this.country = d.countryId;
        this.state = d.stateId;
        this.city = d.cityId;
        this.latitude = d.latitude;
        this.longitude = d.longitude;
    }

    /*
    * End Address
    */

    delete = (msjF: any = 1): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'DELETE',
            url: `${serviceRoot}institution/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                if (msjF == 1) {
                    swAlert('Success', 'Institucion Eliminada!!!', 'success');
                }
                return data;
            },
            error: (error: any) => {
                if (msjF == 1) {
                    swAlert('Opps!!', 'La institucion no se puede eliminar!!!', 'error');
                }
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    /*
    *Gallery
    */

    upImage = (id: number): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}institutioncarousel`,
            data: {
                "institutionId": this.id,
                "originalImageId": id,
                "thumbImageId": null,
            },
            header: null,
            success: (data: any) => {
                //swAlert('Success', 'Institucion Actualizada', 'success');
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    removeImage = (id: number): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'DELETE',
            url: `${serviceRoot}institutioncarousel/${id}`,
            data: null,
            header: null,
            success: (data: any) => {
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    updateImageStatus = (image: ImageCarousel, status: number): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}institutioncarousel/${image.id}`,
            data: {
                "institutionId": this.id,
                "originalImageId": image.originalImageId,
                "thumbImageId": null,
                "statusId": status
            },
            header: null,
            success: (data: any) => {
                //swAlert('Success', 'Institucion Actualizada', 'success');
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    /*
    * 
    * Institutions Header
    * 
    */

    createHeader = (id: number): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}institutionheader`,
            data: {
                "institutionId": this.id,
                "originalImageId": id,
                "thumbImageId": null,
            },
            header: null,
            success: (data: any) => {
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    UpdateHeader = (id: number): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}institutionheader/${this.headerId}`,
            data: {
                "institutionId": this.id,
                "originalImageId": id,
                "thumbImageId": null,
                "statusId": 1
            },
            header: null,
            success: (data: any) => {
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    getHeader = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'GET',
            url: `${serviceRoot}institutionheader/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }


} 