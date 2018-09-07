class SpecialEvent extends ModelService {
    id: number;
    title: string;
    description: string;
    originalImage: Imagen;
    specialEventDay: Date;
    specialEventFrom: Date;
    specialEventTo: Date;
    url: string;
    from: string;
    to: string;
    day: string;
    desc: string;
    constructor(http: ng.IHttpService, q: ng.IQService, private userTypeId: number, private institutionId: number) {
        super(http, q);
        this.id = 0;
        this.title = '';
        this.description = '';
        this.originalImage = new Imagen(http,q,'original',userTypeId);
        this.specialEventDay = new Date();
        this.specialEventFrom = formatTime('00:00');
        this.specialEventTo = formatTime('00:00');
        this.url = '';
        this.from = '';
        this.to = '';
        this.day = '';
        this.desc = '';
    }

    set = (data: any): void => {
        console.log(data);
        this.id = data.id;
        this.institutionId = data.institutionId;
        this.title = data.title;
        this.description = data.description;
        this.originalImage.id = (data.originalImageId) ? data.originalImageId : (data.originalImage.id) ? data.originalImage.id : 0;
        this.originalImage.contentBase64 = (data.originalImageId) ? /* routeImg+ */data.originalImage  : (data.originalImage.id) ? data.originalImage.contentBase64 : 0;
        this.specialEventDay = (typeof data.specialEventDay == 'string')? formatDate(data.specialEventDay) : data.specialEventDay;
        this.day = (typeof data.specialEventDay == 'string') ? data.specialEventDay : '';
        this.specialEventFrom = (typeof data.specialEventFrom == 'string')? formatTime(data.specialEventFrom) : data.specialEventFrom;
        this.from = (typeof data.specialEventFrom == 'string')? formatTime12(data.specialEventFrom): '';
        this.specialEventTo = (typeof data.specialEventTo == 'string')? formatTime(data.specialEventTo) : data.specialEventTo;
        this.to = (typeof data.specialEventTo == 'string')? formatTime12(data.specialEventTo): '';
        this.statusId = data.statusId;
        this.url = data.url;
        console.log(this);
    }

    update = (): ng.IPromise<any> => {
        let data: any = {
            "institutionId": this.institutionId,
            "title": this.title,
            "description": this.description,
            "specialEventDay":  dateToString(this.specialEventDay),
            "specialEventFrom": timeToString(this.specialEventFrom),
            "specialEventTo": timeToString(this.specialEventTo),
            "originalImageId": (this.originalImage.id)? this.originalImage.id : 0,
            "thumbImageId": null,
            "statusId": this.statusId,
            "url": this.url
        }
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}specialevent/${this.id}`,
            data: data,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Evento actualizad0', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'El evento no se ha podido actualizar\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }


    create = (): ng.IPromise<any> => {

        let create: any = {
            "institutionId": this.institutionId,
            "title": this.title,
            "description": this.description,
            "specialEventDay":  dateToString(this.specialEventDay),
            "specialEventFrom": timeToString(this.specialEventFrom),
            "specialEventTo": timeToString(this.specialEventTo),
            "originalImageId": (this.originalImage.id)? this.originalImage.id : 0,
            "thumbImageId": null,
            "url": this.url
        }
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}specialevent`,
            data: create ,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Evento registrado!!!', 'success');
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
            url: `${serviceRoot}specialevent/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Evento Eliminado!!!', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Success', 'El evento no se puede eliminar!!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }
}

