class StateList extends ConsumeService {

    get = (id: number): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'GET',
            url: `${serviceRoot}state/${id}`,
            data: null,
            header: null,
            success: (data: any) => {
                return data;
            },
            error: (error: any, status: any) => {
                let data: any = {
                    error: error,
                    status: status
                }
                return data;
            }
        }
        return this.httpRequest(sr);
    }

    getHttp = (id: number): ng.IPromise<any> => {
        return this.angular.http.get(`${serviceRoot}state/${id}`);
    }

}

class State extends ModelService {
    countryId: number;
    name: string;
    id: number;

    constructor(http: ng.IHttpService, q: ng.IQService, countryId: number) {
        super(http, q);
        this.countryId = countryId;
        this.name = '';
        this.id = 0;
    }

    set = (state: any): void => {
        this.id = state.id;
        this.name = state.name;
        this.statusId = state.statusId;
    }

    update = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}state/${this.id}`,
            data: {
                "name": this.name,
                "countryId": this.countryId,
                "statusId": this.statusId
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Estado Actualizado', 'success');
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
            url: `${serviceRoot}state`,
            data: {
                "name": this.name,
                "countryId": this.countryId
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Estado registrado!!!', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'El estado no se ha podido crear\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    delete = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'DELETE',
            url: `${serviceRoot}state/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Estado Eliminado!!!', 'success');
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }
}