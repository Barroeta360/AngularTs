class Membership extends ModelService {
    id: number;
    priceId: number;
    title: string;
    description: string;
    image: Imagen;
    benefit: Benefit;
    price: number;
    from: Date;
    to: Date;
    typeId: number;
    duration: number;

    constructor(http: ng.IHttpService, q: ng.IQService, typeId: number) {
        super(http, q);
        this.id = 0;
        this.priceId = 0;
        this.title = '';
        this.description = '';
        this.image = new Imagen(http,q,'plan',typeId);
        this.benefit = new Benefit(this.http,this.q);
        this.price = 0;
        this.from = new Date();
        this.to = new Date();
        this.typeId = 0;
        this.duration = 0;
    }

    set = (data: any): void => {
        console.log(data);
        this.id = data.id;
        this.priceId = data.priceId;
        this.title = data.title;
        this.description = data.description;
        this.benefit.set(data.benefit);
        this.price = data.price;
        this.typeId = data.typeId;
        this.image.id = (data.originalImageId) ? data.originalImageId : (data.image.id)? data.image.id:0;
        this.image.contentBase64 = (data.originalImageId) ? data.originalImage  :(data.image.id)? data.image.contentBase64: '';
        this.statusId = data.statusId;
        this.from = data.from;
        this.to = data.to;
        this.duration = data.duration;
        console.log(this)
    }
    get = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'GET',
            url: `${serviceRoot}plan/${this.id}`,
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
    update = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}plan/${this.id}`,
            data: {
                "priceId": this.priceId,
                "title": this.title,
                "description": this.description,
                "statusId": this.statusId,
                "originalImageId": (this.image.id > 0)? this.image.id : null,
                "typeId": this.typeId,
                "duration": toInt(this.duration)
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Membersia actualizada', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'La membresia no se ha podido actualizar\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    create = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}plan`,
            data: {
                "priceId": this.priceId,
                "title": this.title,
                "description": this.description,
                "originalImageId": (this.image.id > 0)? this.image.id : null,
                "typeId": this.typeId,
                "duration": toInt(this.duration)
            } ,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Membresia registrada!!!', 'success');
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    delete = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'DELETE',
            url: `${serviceRoot}plan/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Membresia Eliminada!!!', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Success', 'La membresia no se puede eliminar!!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    benefitToMembership = (membership: Membership): ng.IPromise<any> => {
        let $q: ng.IQService = this.q;
        let $d: ng.IDeferred<any> = $q.defer();
        let $p: ng.IPromise<any> = $d.promise;
        membership.benefit.get().then((value: any) => {
            console.log(value)
            membership.benefit.set(value);
            $d.resolve(membership);
        }).catch((reason: any) => {
            $d.reject(reason);
            console.log(reason);
        })
        return $p;
    }

    setMeABenefit = (): ng.IPromise<any> => {
        let $q: ng.IQService = this.q;
        let $d: ng.IDeferred<any> = $q.defer();
        let $p: ng.IPromise<any> = $d.promise;
        this.benefit.get().then((value: any) => {
            this.benefit.set(value);
            $d.resolve(this);
        }).catch((reason: any) => {
            $d.reject(reason);
            console.log(reason);
        })
        return $p;
    }
}

