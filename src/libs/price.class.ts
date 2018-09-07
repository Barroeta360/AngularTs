class PriceList extends ArrayList {
    list: Array<Price>;

    constructor(url: string){
        super(url);
        this.list = [];
    }

    getPrice = (id:number): number => {
        for(var i = 0; i < this.list.length; i++){
            if(this.list[i].id == id){
                return this.list[i].price;
            }
        }
        return 0;
    }

    setActiveList = (list: Array<Price>): void => {
        for(var i = 0; i < list.length; i++){
            if(list[i].statusId == 1){
                this.list.push(list[i]);
            }
        }
    }

}

class Price extends ModelService {
    price: number;

    constructor(http: any, q: ng.IQService) {
        super(http, q);
        this.price = 0;
    }

    create = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}price`,
            data: {
                "price": this.price,
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Precio registrado!!!', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'El precio no se ha podido crear\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    set = (data: Price): void => {
        this.id = data.id;
        this.price = data.price;
        this.statusId = data.statusId;
    }

    update = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}price/${this.id}`,
            data: {
                "price": this.price,
                "statusId": this.statusId
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Precio Actualizado', 'success');
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
            url: `${serviceRoot}price/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Precio Eliminado!!!', 'success');
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }
}