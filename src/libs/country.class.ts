class CountryList extends ConsumeService {

    get = (): ng.IPromise<any> => {

        /*if()*/

        /*let $http = this.angular.http;
        let $q:any = this.angular.q;
        let $d:any = $q.defer();
        let $p:any = $d.promise;
        let sr:ServiceResquest = {
            method: 'GET',
            url: `${serviceRoot}country`,
            data: null,
            header:null,
            success: (data:any) => {
                return data;
            },
            error: (error:any,status:any) => {
                let data:any = {
                    error:error,
                    status:status
                }
                return data;
            }
        }
        console.log(this.r);
        if(this.r){
            this.t1 = true;
            this.t2 = false;
            this.r = false;
            $http(this.jsonMethod(sr.method,sr.url,sr.data,sr.header)).success((data:any) => {
                if(this.t1 == true){
                    $d.resolve(sr.success(data));
                }else{
                    $d.reject(sr.success(data));
                }
            }).error((error:any) => {
                $d.reject(sr.error(error));
            }); 
        }else{
            this.t1 = false;
            this.t2 = true;
            this.r = true;
            
            $d:any = $q.defer();
            $p:any = $d.promise;
            $http(this.jsonMethod(sr.method,sr.url,sr.data,sr.header)).success((data:any) => {
                if(this.t2 == true){
                    $d.resolve(sr.success(data));
                }else{
                    $d.reject(sr.success(data));
                }
            }).error((error:any) => {
                $d.reject(sr.error(error));
            });
        }
        return $p;
        */

        let sr: ServiceResquest = {
            method: 'GET',
            url: `${serviceRoot}country`,
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

    getHttp = (): ng.IPromise<any> => {
        return this.angular.http.get(`${serviceRoot}country`);
    }

}

class Country extends ModelService {
    name: string;
    code: number;

    constructor(http: any, q: ng.IQService) {
        super(http, q);
        this.name = '';
        this.code = 0;
    }

    set = (country: Country): void => {
        this.name = country.name;
        this.code = country.code;
        this.id = country.id;
        this.statusId = country.statusId;
    }

    update = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}country/${this.id}`,
            data: {
                "name": this.name,
                "code": this.code,
                "statusId": this.statusId
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Pais Actualizado', 'success');
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
            url: `${serviceRoot}country`,
            data: {
                "name": this.name,
                "code": this.code
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Pais registrado!!!', 'success');
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
            url: `${serviceRoot}country/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Pais Eliminado!!!', 'success');
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }
}