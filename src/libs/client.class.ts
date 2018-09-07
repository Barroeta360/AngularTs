class ClientList extends ConsumeService{
    
    
    getHttp = (): ng.IPromise<any> => {
        return this.angular.http.get(`${serviceRoot}client`);
    }
    get = (): ng.IPromise<any> => {
        
        let sr:ServiceResquest = {
            method: 'GET',
            url: `${serviceRoot}client`,
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
        
        return this.httpRequest(sr);
    }
    
}

class Client extends ModelService{
    name:string;
    lastname:string;
    telephone:string | null;
    userId:number;
    birthday:Date | null;
    genre:string | null;
    localphone:string | null;
    civilStatus:number | null;
    childQuantity:number | string;
    zone:number | null;
    dni:number | null;
    notification:boolean;

    constructor(http:ng.IHttpService,q:ng.IQService){
        super(http,q);
        this.name = '';
        this.lastname = '';
        this.telephone = '';
        this.userId = 0;
        this.birthday = null;
        this.genre = '';
        this.localphone = '';
        this.civilStatus = 0;
        this.childQuantity = "";
        this.zone = 0;
        this.dni = null;
        this.notification = false;
    }

    get = (id:number): ng.IPromise<any> => {
        let sr:ServiceResquest = {
            method: 'GET',
            url: `${serviceRoot}client/${id}`,
            data: null,
            header:null,
            success: (data:any) => {
                return data;
            },
            error: (error:any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    set = (data:Client): void => {
        if(data){
            this.name = data.name;
            this.id = data.id;
            this.statusId = data.statusId;
            this.lastname = data.lastname;
            this.telephone = data.telephone;
            this.userId = data.userId;
            this.birthday = formatDate(data.birthday);
        }
    }
    
    update = (): ng.IPromise<any> => {
        console.log(this)
        let sr:ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}client/${this.id}`,
            data: {
                "name" : this.name,
                "lastname" : this.lastname,
                //"birthday" : dateToString(this.birthday),
                "telephone" : this.telephone,
                "userId" : this.userId,
                "statusId" : this.statusId
            },
            header:null,
            success: (data:any) => {
                swAlert('Success','Usuario Actualizado','success');
                return data;
            },
            error: (error:any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }
    
    create = (): ng.IPromise<any> => {
        
        let sr:ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}client`,
            data: {
                "name" : this.name,
                "lastname" : this.lastname,
                //"birthday" : dateToString(this.birthday),
                "telephone" : this.telephone,
                "userId": this.userId
            },
            header:null,
            success: (data:any) => {
                //swAlert('Success','Tag registrado!!!','success');
                return data;
            },
            error: (error:any) => {
                //swAlert('Oops','El tag no se ha podido crear\n trate nuevamente !!!','error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }
    
    
    delete = (): ng.IPromise<any> => {
        let sr:ServiceResquest = {
            method: 'DELETE',
            url: `${serviceRoot}client/${this.id}`,
            data: null,
            header:null,
            success: (data:any) => {
                swAlert('Success','Usuario Eliminado!!!','success');
                return data;
            },
            error: (error:any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }
}