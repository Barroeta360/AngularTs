class UserTypeList extends ConsumeService {

    listArray:Array<string>;

    constructor(angular:angularServices){
        super(angular);
        this.listArray = [];
    }

    get = (): ng.IPromise<any> => {

        let sr: ServiceResquest = {
            method: 'GET',
            url: `${serviceRoot}usertype`,
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

    setArray = (data:any): void => {
        let list:Array<UserType> = [];
        //Se llena la lista de todos los tipos de usuarios instanciados como objetos del tipo UserType
        for(var i=0; i < data.length; i++){
            let ut:UserType = new UserType(this.angular.http,this.angular.q);
            ut.set(data[i]);
            list.push(ut);
        }
        //Se crea una lista de todos los tipos de usuarios validos 
        for(var i=0; i < list.length; i++){
            if(list[i].statusId == 1){
                this.listArray[list[i].id] = list[i].description;
            }
        }
    }    

    getHttp = (): ng.IPromise<any> => {
        return this.angular.http.get(serviceRoot + 'usertype');
    }

}

class UserType extends ModelService {
    description: string;
    imageArchiveId: number;

    constructor(http: ng.IHttpService, q: ng.IQService) {
        super(http, q);
        this.description = '';
        this.imageArchiveId = 0;
    }

    set = (data: UserType): void => {
        this.description = data.description;
        this.id = data.id;
        this.statusId = data.statusId;
        this.imageArchiveId = data.imageArchiveId
    }


    update = (): ng.IPromise<any> => {

        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}usertype/${this.id}`,
            data: {
                "imageArchiveId": this.imageArchiveId,
                "description": this.description,
                "statusId": this.statusId
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Tipo de Usuario Actualizado', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'El Tipo de Usuario no se ha podido Actualizar\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    create = (): ng.IPromise<any> => {

        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}usertype`,
            data: {
                "imageArchiveId": this.imageArchiveId,
                "description": this.description,
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Tag Creado', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'El tag no se ha podido crear\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    delete = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'DELETE',
            url: `${serviceRoot}usertype/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Tipo de usuario Eliminado!!!', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'El tipo de usuario no se ha podido eliminar\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }

}