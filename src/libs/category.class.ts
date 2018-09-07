
class Category extends ModelService {
    categoryTitle: string;
    categoryTypeId: number;

    //
    image: Imagen;
    imagePin: Imagen;
    constructor(http: ng.IHttpService, q: ng.IQService, public userType: number) {
        super(http, q);
        this.categoryTitle = "";
        this.categoryTypeId = 1;
        this.image = new Imagen(http,q,'original', this.userType);
        this.imagePin = new Imagen(http,q,'pin', this.userType);
    }

    set = (data: any): void => {
        console.log(data);
        this.id = data.id;
        this.statusId = data.statusId;
        this.categoryTitle = data.categoryTitle;
        this.categoryTypeId = data.categoryTypeId;
        this.image.id = (data.originalImageId) ? data.originalImageId : 0;
        this.image.contentBase64 = (data.originalImageId) ? routeImg+data.originalImage  : '';
        this.imagePin.id = (data.originalPinImageId) ? data.originalPinImageId : 0;
        this.imagePin.contentBase64 = (data.originalPinImageId) ? routeImg+data.pinImage  : '';
    }

    update = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}category/${this.id}`,
            data: {
                "categoryTypeId": this.categoryTypeId,
                "categoryTitle": this.categoryTitle,
                "originalImageId": (this.image.id > 0)? this.image.id : null,
                "originalPinImageId": (this.imagePin.id > 0)? this.imagePin.id : null,
                "statusId": this.statusId
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Categoría actualizada', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('¡Oops!', 'La categoría no se ha podido actualizar\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    create = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}category`,
            data: {
                "categoryTypeId": this.categoryTypeId,
                "categoryTitle": this.categoryTitle,
                "originalImageId": (this.image.id > 0)? this.image.id : null,
                "originalPinImageId": (this.imagePin.id > 0)? this.imagePin.id : null
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Categoría registrada!!!', 'success');
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
            url: `${serviceRoot}category/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Categoría Eliminada!!!', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Success', 'La categoría no se puede eliminar!!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }
}