

class Status extends ModelService {
    description: string;

    constructor(http: ng.IHttpService, q: ng.IQService) {
        super(http, q);
        this.description = '';
    }

    set = (data: any): void => {
        this.id = data.id;
        this.description = data.description;
    }

    update = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}status/${this.id}`,
            data: {
                "description": this.description
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Status Actualizado', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'El status no se ha podido actualizar\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    create = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}status`,
            data: {
                "description": this.description
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Status registrado!!!', 'success');
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
            url: `${serviceRoot}status/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Status Eliminado!!!', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Success', 'El estatus no se puede eliminar!!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }
}