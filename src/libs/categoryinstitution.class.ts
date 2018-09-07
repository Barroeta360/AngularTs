class CategoryInstitution extends ModelService {
    categoryId: number;

    constructor(http: ng.IHttpService, q: ng.IQService, private userTypeId: number, private institutionId: number) {
        super(http, q);
        this.categoryId = 0;
        this.id = 0;
    }

    add = (): ng.IPromise<any> => {

        let create: any = {
            "institutionId": this.institutionId,
            "categoryId": this.categoryId,
        }
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}categoryinstitution`,
            data: create ,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Categoria asociada!!!', 'success');
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    remove = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'DELETE',
            url: `${serviceRoot}categoryinstitution/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Categoria removida!!!', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Success', 'La categoria no se puede remover!!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }
}

