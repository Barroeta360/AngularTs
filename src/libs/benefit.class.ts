
class Benefit extends ModelService {
    planId: number;
    benefitPromotion: number;
    benefitEvent: number;
    benefitDaily: number;
    benefitImage: number;

    constructor(http: ng.IHttpService, q: ng.IQService) {
        super(http, q);
        this.planId = 0;
        this.benefitPromotion = 0;
        this.benefitEvent = 0;
        this.benefitDaily = 0;
        this.benefitImage = 0;
    }

    get = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'GET',
            url: `${serviceRoot}planbenefit/${this.planId}`,
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

    create = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}planbenefit`,
            data: {
                "planId": this.planId,
                "benefitPromotion": this.benefitPromotion,
                "benefitEvent": this.benefitEvent,
                "benefitDaily": this.benefitDaily,
                "benefitImage": this.benefitImage,
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Beneficios registrado!!!', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'Los beneficios no se han podido crear\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    set = (data: Benefit): void => {
        if(data){
            this.id = data.id;
            this.statusId = data.statusId;
            this.planId = data.planId;
            this.benefitDaily = data.benefitDaily;
            this.benefitEvent = data.benefitEvent;
            this.benefitImage = data.benefitImage;
            this.benefitPromotion = data.benefitPromotion;
        }
    }

    update = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}planbenefit/${this.id}`,
            data: {
                "statusId": this.statusId,
                "planId": this.planId,
                "benefitPromotion": this.benefitPromotion,
                "benefitEvent": this.benefitEvent,
                "benefitDaily": this.benefitDaily,
                "benefitImage": this.benefitImage,
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Beneficios Actualizados', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'Los beneficios no se han podido Actualizar\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    delete = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'DELETE',
            url: `${serviceRoot}planbenefit/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Beneficios Eliminados!!!', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'Los beneficios no se han podido Eliminar\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }
}