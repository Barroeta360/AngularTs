class TagList extends ConsumeService{
    
    
    getHttp = (): ng.IPromise<any> => {
        return this.angular.http.get(`${serviceRoot}tag`);
    }
    get = (): ng.IPromise<any> => {
        /*return this.angular.http.get(serviceRoot+'tags');*/
        
        let sr:ServiceResquest = {
            method: 'GET',
            url: `${serviceRoot}tag`,
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
    
    getListByInst = (id:number) => {
        this.list = [
            {
                id:1,
                name:'Restaurant'
            },
            {
                id:2,
                name:'Bar'
            },
            {
                id:3,
                name:'Italiano'
            },
        ];
    }
    
}

class Tag extends ModelService{
    description:string;

    constructor(http:ng.IHttpService,q:ng.IQService){
        super(http,q);
        this.description = '';
    }
    
    set = (data:any): void => {
        this.description = data.description;
        this.id = data.id;
        this.statusId = data.statusId;
    }
    
    update = (): ng.IPromise<any> => {
        
        let sr:ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}tag/${this.id}`,
            data: {
                "description" : this.description,
                "statusId" : this.statusId
            },
            header:null,
            success: (data:any) => {
                swAlert('Success','Tag Actualizado','success');
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
            url: `${serviceRoot}tag`,
            data: {
                "description" : this.description
            },
            header:null,
            success: (data:any) => {
                swAlert('Success','Tag registrado!!!','success');
                return data;
            },
            error: (error:any) => {
                swAlert('Oops','El tag no se ha podido crear\n trate nuevamente !!!','error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }
    
    
    delete = (): ng.IPromise<any> => {
        let sr:ServiceResquest = {
            method: 'DELETE',
            url: `${serviceRoot}tag/${this.id}`,
            data: null,
            header:null,
            success: (data:any) => {
                swAlert('Success','Tag Eliminado!!!','success');
                return data;
            },
            error: (error:any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }
}