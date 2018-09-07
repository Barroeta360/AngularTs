class CityList extends ConsumeService {

    get = (id: number): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'GET',
            url: `${serviceRoot}city/${id}`,
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

    getHttp = (id: any): ng.IPromise<any> => {
        return this.angular.http.get(`${serviceRoot}city/${id}`);
    }

}

class City extends ModelService {
    name: string;
    zipCode: number;
    stateId: number;
    latitude: number;
    longitude: number;

    constructor(http: any, q: ng.IQService, stateId: number) {
        super(http, q);
        this.name = '';
        this.zipCode = 0;
        this.latitude = 0;
        this.longitude = 0;
        this.stateId = stateId;
    }

    create = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}city`,
            data: {
                "stateId": this.stateId,
                "name": this.name,
                "zipCode": this.zipCode,
                "latitude": this.latitude,
                "longitude": this.longitude
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Ciudad registrado!!!', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'La ciudad no se ha podido crear\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    set = (city: any): void => {
        this.id = city.id;
        this.name = city.name;
        this.statusId = city.statusId;
        this.zipCode = city.zipCode;
        this.latitude = city.latitude;
        this.longitude = city.longitude;
    }

    update = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}city/${this.id}`,
            data: {
                "stateId": this.stateId,
                "name": this.name,
                "zipCode": this.zipCode,
                "latitude": this.latitude,
                "longitude": this.longitude,
                "statusId": this.statusId
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Ciudad Actualizado', 'success');
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
            url: `${serviceRoot}city/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Ciudad Eliminado!!!', 'success');
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }
}