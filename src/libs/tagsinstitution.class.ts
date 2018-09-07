class TagInstitution extends ModelService {
    tagId: number;

    constructor(http: ng.IHttpService, q: ng.IQService, private userTypeId: number, private institutionId: number) {
        super(http, q);
        this.tagId = 0;
        this.id = 0;
    }

    /* update = (): ng.IPromise<any> => {
        let data: any = {
            "institutionId": this.institutionId,
            "title": this.title,
        }
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}specialpromotion/${this.id}`,
            data: data,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Promocion actualizada', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'El evento no se ha podido actualizar\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    } */


    add = (): ng.IPromise<any> => {

        let create: any = {
            "institutionId": this.institutionId,
            "tagId": this.tagId,
        }
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}taginstitution`,
            data: create ,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Tag registrado!!!', 'success');
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
            url: `${serviceRoot}taginstitution/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Tag removido!!!', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Success', 'El tag no se puede remover!!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }
}

