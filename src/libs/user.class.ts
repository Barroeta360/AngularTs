class UserList extends ConsumeService {
    listUserClient: Array<User>;
    list: Array<User>;

    constructor(angular: angularServices) {
        super(angular);
        this.listUserClient = new Array();
        this.list = new Array();
    }

    pushUser = (user: User): void => {
        this.listUserClient.push(user);
    }

    getHttp = (): ng.IPromise<any> => {
        return this.angular.http.get(`${serviceRoot}user`);
    }
    get = (): ng.IPromise<any> => {

        let sr: ServiceResquest = {
            method: 'GET',
            url: `${serviceRoot}user`,
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

}

class User extends ModelService {
    email: string;
    typeId: number;
    password: string;
    password2: string;
    client: Client;
    token: string;

    constructor(http: ng.IHttpService, q: ng.IQService) {
        super(http, q);
        this.email = '';
        this.typeId = 1;
        this.password = '';
        this.password2 = '';
        this.token = '';
        this.client = new Client(http, q);
    }

    set = (data: User): void => {
        if (data) {
            this.email = data.email;
            this.id = data.id;
            this.statusId = data.statusId;
            this.typeId = data.typeId;
        }
    }

    getUserById = (id: number): ng.IPromise<any> => {

        let sr: ServiceResquest = {
            method: 'GET',
            url: `${serviceRoot}user/${id}`,
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

    setClient = (data: Client): void => {
        this.client.set(data);
    }

    login = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}user/login`,
            data: {
                "email": this.email,
                "password": this.password
            },
            header: null,
            success: (data: any) => {
                console.log(data);
                return data;
            },
            error: (error: any) => {
                swAlert('Invalido', 'Usuario o clave invalida', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }


    recoverPassword = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}user/recover`,
            data: {
                "email": this.email
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'La clave ha sido enviado a su correo', 'success');
                this.email = '';
                return data;
            },
            error: (error: any) => {
                swAlert('Error', 'La clave no se pudo reenviar a su correo\ntrate nuevamente', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }
    changePassword = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}user/password`,
            data: {
                "email": this.email,
                "password": this.password,
                "token": this.token
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Clave actualizada', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Error', 'La clave no ha actualizada\ntrate nuevamente', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    update = (): ng.IPromise<any> => {

        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}user/${this.id}`,
            data: {
                "typeId": this.typeId,
                "statusId": this.statusId
            },
            header: null,
            success: (data: any) => {
                /* swAlert('Success','Tag Actualizado','success'); */
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
            url: `${serviceRoot}user/register`,
            data: {
                "user": {
                    "email": this.email,
                    "type": this.typeId,
                    "password": this.password,
                    "token": this.token
                },
                "userProfile" : {
                    "name": this.client.name,
                    "lastname": this.client.lastname,
                    "DNI": this.client.dni,
                    "civilStatus": this.client.civilStatus,
                    "address": this.client.zone,
                    "genre": this.client.genre,
                    "birthday": this.client.birthday,
                    "childQuantity": this.client.childQuantity,
                    "notification": this.client.notification,
                    "phone_1": getElementById('local'),
                    "phone_2": getElementById('cel')
                }
            },
            header: null,
            success: (data: any) => {
                swAlert('Success','Usuario registrado!!!','success'); 
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'El Usuario no se ha podido crear\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        console.log(sr);
        return this.httpRequest(sr);
    }

    register = (): ng.IPromise<any> => {

        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}user/preregister`,
            data: {
                "email": this.email
            },
            header: null,
            success: (data: any) => {
                /* swAlert('Success','Tag registrado!!!','success'); */
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'El Correo no se ha podido enviar\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        console.log(sr);
        return this.httpRequest(sr);
    }

    delete = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'DELETE',
            url: `${serviceRoot}user/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Usuario inhabilitado!!!', 'success');
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }
}