class CategoryTypeList  extends ConsumeService{
    
    get = (): ng.IPromise<any> => {
        
        let sr:ServiceResquest = {
            method: 'GET',
            url: `${serviceRoot}categorytype`,
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
    
    
    getHttp = (): ng.IPromise<any> => {
        return this.angular.http.get(`${serviceRoot}status`);
    }
    
}

class CategoryType extends ModelService{
    id:number = 0;
    description:string = '';
    
    set = (data:any): void => {
        this.id = data.id;
        this.description = data.description;
        this.statusId = data.statusId;
    }
    
    update = (): ng.IPromise<any> => {
        let sr:ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}categorytype/${this.id}`,
            data: {
                "description": this.description,
                "statusId": this.statusId
            },
            header:null,
            success: (data:any) => {
                swAlert('Success','Tipo de categoría Actualizado','success');
                return data;
            },
            error: (error:any) => {
                swAlert('¡Oops!','El tipo de categoría no se ha podido actualizar\n trate nuevamente !!!','error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }
    
    create = (): ng.IPromise<any> => {
        let sr:ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}categorytype`,
            data: {
                "description": this.description
            },
            header:null,
            success: (data:any) => {
                swAlert('Success','Tipo de categoría registrado!!!','success');
                return data;
            },
            error: (error:any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }
    
    delete = (): ng.IPromise<any> => {
        let sr:ServiceResquest = {
            method: 'DELETE',
            url: `${serviceRoot}categorytype/${this.id}`,
            data: null,
            header:null,
            success: (data:any) => {
                swAlert('Success','Tipo de categoría Eliminado!!!','success');
                return data;
            },
            error: (error:any) => {
                swAlert('Success','El tipo de categoría no se puede eliminar!!!','error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }
}