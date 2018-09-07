class MembershipType extends ModelService {
    description: string;

    constructor(http: ng.IHttpService, q: ng.IQService) {
        super(http, q);
        this.description = '';
    }

    set = (data: any): void => {
        this.description = data.description;
        this.id = data.id;
        this.statusId = data.statusId;
    }


    update = (): ng.IPromise<any> => {

        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}plantype/${this.id}`,
            data: {
                "description": this.description,
                "statusId": this.statusId
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Tipo de Plan Actualizado', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'El Tipo de Plan no se ha podido Actualizar\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    create = (): ng.IPromise<any> => {

        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}plantype`,
            data: {
                "description": this.description,
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Tipo de plan Creado', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'El tipo de plan no se ha podido crear\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    delete = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'DELETE',
            url: `${serviceRoot}plantype/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Tipo de plan Eliminado!!!', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'El tipo de plan no se ha podido eliminar\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }

}