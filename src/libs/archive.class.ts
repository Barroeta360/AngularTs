

class Archive extends ModelService {
    description: string;

    constructor(http: any, q: ng.IQService) {
        super(http, q);
        this.description = '';
    }

    create = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}imagearchive`,
            data: {
                "description": this.description,
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Archivo registrado!!!', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'El archivo no se ha podido crear\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    set = (data: Archive): void => {
        this.id = data.id;
        this.description = data.description;
        this.statusId = data.statusId;
    }

    update = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}imagearchive/${this.id}`,
            data: {
                "description": this.description,
                "statusId": this.statusId
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Archivo Actualizado', 'success');
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
            url: `${serviceRoot}imagearchive/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Archivo Eliminado!!!', 'success');
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }
}