class Promotion extends ModelService {
    id: number;
    title: string;
    description: string;
    originalImage1: Imagen;
    originalImage2: Imagen;
    originalImage3: Imagen;
    originalImage4: Imagen;
    specialPromotionStartDay: Date;
    specialPromotionEndDay: Date;
    from: string;
    to: string;
    desc: string;
    constructor(http: ng.IHttpService, q: ng.IQService, private userTypeId: number, private institutionId: number) {
        super(http, q);
        this.id = 0;
        this.title = '';
        this.description = '';
        this.originalImage1 = new Imagen(http,q,'original',userTypeId);
        this.originalImage2 = new Imagen(http,q,'original',userTypeId);
        this.originalImage3 = new Imagen(http,q,'original',userTypeId);
        this.originalImage4 = new Imagen(http,q,'original',userTypeId);
        this.specialPromotionStartDay = new Date();
        this.specialPromotionEndDay = new Date();
        this.from = '';
        this.to = '';
        this.desc = '';
    }

    set = (data: any): void => {
        console.log(data);
        this.id = data.id;
        this.institutionId = data.institutionId;
        this.title = data.title;
        this.description = data.description;
        // Imagen 1
        this.originalImage1.id = (data.originalImageId1) ? data.originalImageId1 : (data.originalImage1) ? data.originalImage1.id : 0;
        this.originalImage1.contentBase64 = (data.originalImageId1) ? /* routeImg+ */data.originalImage[0]  : (data.originalImage1) ? data.originalImage1.contentBase64 : 0;
        // Imagen 2
        this.originalImage2.id = (data.originalImageId2) ? data.originalImageId2 : (data.originalImage2) ? data.originalImage2.id : 0;
        this.originalImage2.contentBase64 = (data.originalImageId2) ? /* routeImg+ */data.originalImage[1]  : (data.originalImage2) ? data.originalImage2.contentBase64 : 0;
        // Imagen 3
        this.originalImage3.id = (data.originalImageId3) ? data.originalImageId3 : (data.originalImage3) ? data.originalImage3.id : 0;
        this.originalImage3.contentBase64 = (data.originalImageId3) ? /* routeImg+ */data.originalImage[2]  : (data.originalImage3) ? data.originalImage3.contentBase64 : 0;
        // Imagen 4
        this.originalImage4.id = (data.originalImageId4) ? data.originalImageId4 : (data.originalImage4) ? data.originalImage4.id : 0;
        this.originalImage4.contentBase64 = (data.originalImageId4) ? /* routeImg+ */data.originalImage[3]  : (data.originalImage4) ? data.originalImage4.contentBase64 : 0;

        this.specialPromotionStartDay = (typeof data.specialPromotionStartDay == 'string')? formatDate(data.specialPromotionStartDay) : data.specialPromotionStartDay;        
        this.from = (typeof data.specialPromotionStartDay == 'string')? data.specialPromotionStartDay: '';
        
        this.specialPromotionEndDay = (typeof data.specialPromotionEndDay == 'string')? formatDate(data.specialPromotionEndDay) : data.specialPromotionEndDay;        
        this.to = (typeof data.specialPromotionEndDay == 'string')? data.specialPromotionEndDay: '';

        this.statusId = data.statusId;
        console.log(this);
    }

    update = (): ng.IPromise<any> => {
        let data: any = {
            "institutionId": this.institutionId,
            "title": this.title,
            "description": this.description,
            "specialPromotionStartDay": dateToString(this.specialPromotionStartDay),
            "specialPromotionEndDay": dateToString(this.specialPromotionEndDay),
            "originalImageId1": (this.originalImage1.id > 0)? this.originalImage1.id : null,
            "originalImageId2": (this.originalImage2.id > 0)? this.originalImage2.id : null,
            "originalImageId3": (this.originalImage3.id > 0)? this.originalImage3.id : null,
            "originalImageId4": (this.originalImage4.id > 0)? this.originalImage4.id : null,
            "statusId": this.statusId
        }
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}specialpromotion/${this.id}`,
            data: data,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Promocion actualizada', 'success');
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
            "specialPromotionStartDay": dateToString(this.specialPromotionStartDay),
            "specialPromotionEndDay": dateToString(this.specialPromotionEndDay),
            "originalImageId1": (this.originalImage1.id > 0)? this.originalImage1.id : null,
            "originalImageId2": (this.originalImage2.id > 0)? this.originalImage2.id : null,
            "originalImageId3": (this.originalImage3.id > 0)? this.originalImage3.id : null,
            "originalImageId4": (this.originalImage4.id > 0)? this.originalImage4.id : null
        }
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}specialpromotion`,
            data: create ,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Promocion registrada!!!', 'success');
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
            url: `${serviceRoot}specialpromotion/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Promocion Eliminada!!!', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Success', 'La promocion no se puede eliminar!!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }
}

