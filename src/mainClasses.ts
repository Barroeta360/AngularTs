abstract class angularHTTP {

    constructor(public http: ng.IHttpService, protected q: ng.IQService) {

    }

    httpRequest = (sr: ServiceResquest): ng.IPromise<any> => {
        let $http = this.http;
        let $q: ng.IQService = this.q;
        let $d: ng.IDeferred<any> = $q.defer();
        let $p: ng.IPromise<any> = $d.promise;
        $http(this.jsonMethod(sr.method, sr.url, sr.data, sr.header)).then((res: any) => {
            $d.resolve(sr.success(res.data));
        }).catch((nError: any) => {
            console.log(nError);
            $d.reject(sr.error())
            switch (nError.status) {
                case -10:
                    swAlert('¡Oops!', 'No se pudo conectar con waychile.com\nTrate nuevamente', 'error');
                    $d.reject(nError);
                    break;
                case 401:
                    swConfirm('No autorizado!!', 'Su sesión a expirado', 'warning', false).then((value: boolean) => {
                        if (value == true) {
                            let a: angularServices = angularServices;
                            a.rs.myClient = null;
                            a.rs.myUser = null;
                            a.ss.$reset();
                            if (this.http.defaults.headers != undefined) {
                                this.http.defaults.headers.common['W-Token'] = '';
                            }
                            angularServices.ss.user = null;
                            angularServices.window.location.href = '#/home';
                        }
                    })
                    break;
                case 403:
                    swConfirm('Sesión Expirada', 'No esta autorizado para ingresar', 'warning', false).then((value: boolean) => {
                        if (value == true) {
                            let a: angularServices = angularServices;
                            a.rs.myClient = null;
                            a.rs.myUser = null;
                            a.ss.$reset();
                            if (this.http.defaults.headers != undefined) {
                                this.http.defaults.headers.common['W-Token'] = '';
                            }
                            angularServices.ss.user = null;
                            angularServices.window.location.href = '#/home';
                        }
                    })
                    break;
                case 404:
                    swAlert('Mensaje', 'No hay registros asociados', 'info');
                    $d.reject(nError);
                    break;
                case 405:
                    $d.reject(`Metodo ${nError.config.method} no permitido para la ruta ${nError.config.url}`)
                default:
                    $d.reject(sr.error(nError));
            }
        }).finally(() => {
            $('.tooltip').remove();
        });
        return $p;
    }

    falseRequest = (): ng.IPromise<any> => {
        let $http = this.http;
        let $q: ng.IQService = this.q;
        let $d: ng.IDeferred<any> = $q.defer();
        let $p: ng.IPromise<any> = $d.promise;
        $d.resolve(null);
        return $p;
    }

    jsonMethod = (method: string, url: string, data: any, header: any) => {
        if (method == "GET" || method == "DELETE") {
            if (header != null) {
                return {
                    method: method,
                    url: url,
                    header: header
                }
            }
            return {
                method: method,
                url: url
            }
        } else {
            if (header != null) {
                return {
                    method: method,
                    url: url,
                    data: data,
                    header: header
                }
            }
            return {
                method: method,
                url: url,
                data: data
            }
        }
    }

}

// clase padre para los controllers 
abstract class Controller {
    buttonModalLadda: boolean;
    buttonModal: string;
    myUser: User;
    myUserType: ArrayList;
    slides: Array<any>;//
    //map: GoogleMap;

    constructor(public angular: angularServices) {
        this.buttonModalLadda = false;
        this.myUser = new User(angular.http, angular.q);
        this.buttonModal = 'Crear';
        this.myUserType = new ArrayList('usertype');
        this.slides = [];
        this.fillHeader();
        this.validateUser();
        //this.getMyUserType(this.validateUser);
    }

    openModal = (id): void => {
        $(id).modal('show');
    }

    getMyUserType = (cb: Function): void => {
        this.myUserType.get().then((value: any) => {
            this.myUserType.list = value;
            cb();
        })
    }

    validateUser = (): void => {
        let a: angularServices = this.angular;
        //this.myUser.id = a.ss.userId;
        //this.myUser.client.id = a.ss.clientId;
        let c: string = readCookie('type').trim();
        if (!c || c == '') {
            a.window.location.href = `#/login`;
        } else {
            this.myUser.client.name = this.angular.ss.user.userProfile.name;
            this.myUser.client.lastname = this.angular.ss.user.userProfile.lastname;
            /* 
            if (!a.ss.myUser) {
                this.myUser.getUserById(a.ss.userId).then((value: any) => {
                    let ut: any = this.myUserType.getById(value.typeId);
                    if(ut.description.indexOf('Vip') >= 0){
                        a.ss.myUser = value;
                        a.rs.myUser = value;
                        this.myUser.set(value);                    
                    }else{
                        swAlert('¡Error!', 'No esta autorizado para acceder', 'error');
                        this.logOut();
                    }

                })
            } else {
                this.myUser.set(a.ss.myUser);
                a.rs.myUser = a.ss.myUser;
            }
            if (!a.ss.myClient) {
                this.myUser.client.get(a.ss.clientId).then((value: any) => {
                    a.ss.myClient = value;
                    a.rs.myClient = value;
                    this.myUser.client.set(value);
                })
            } else {
                this.myUser.client.set(a.ss.myClient);
                a.rs.myClient = a.ss.myClient;
            } */
        }
    }

    logOut = (): void => {
        swConfirm('Cerrar Sesión', 'Estas seguro de cerrar la sesión?').then((value: boolean) => {
            if (value) {
                this.myUser = new User(this.angular.http, this.angular.q);
                let a: angularServices = this.angular;
                a.ss.$reset();
                if (this.angular.http.defaults.headers != undefined) {
                    //this.angular.http.defaults.headers.common['W-Token'] = '';
                }
                deleteCookie('type');
                this.validateUser();
            }
        })
    }

    recoverPassword = (): void => {
        this.myUser.recoverPassword().then((value: any) => {
            closeModal('#modalLoginForm');
            this.myUser = new User(this.angular.http, this.angular.q);
        }).catch((reason: any) => {
            console.log(reason)
        })
    }

    changePassword = (): void => {
        this.myUser.changePassword().then((value: any) => {
            closeModal('#changeModal');
        })

    }

    fillHeader = (): void => {
        let length: number = 3;
        let img: Array<string> = ['media/ed13.jpg', 'media/ed154.png', 'media/ed29.jpg'];
        for (var i = 0; i < length; i++) {
            let newPromoSlide = {
                image: img[i],
                text: `Este es el texto para la imagen ${i + 1}`,
                title: `Imagen ${i + 1}`,
                id: i + 1
            }
            this.slides.push(newPromoSlide);
        }
        console.log(this.slides);
    }
}

// Clase padre de las clases que manejar objetos unicos
abstract class ModelService extends angularHTTP {
    statusId: number;
    id: number;

    constructor(http: ng.IHttpService, q: ng.IQService) {
        super(http, q);
        this.statusId = 3;
        this.id = 0;
    }

    set = (data: any): void => {
        this.statusId = data.statusId;
    }

    update = (data: any = null): ng.IPromise<any> => {
        let $q: ng.IQService = this.q;
        return $q.defer().promise;
    }

    updateStatus = (data: any): ng.IPromise<any> => {
        this.set(data);
        if (this.statusId == 1) {
            this.statusId = 3
        } else {
            this.statusId = 1
        }
        return this.update();
    }

    create = (): ng.IPromise<any> => {
        let $q: ng.IQService = this.q;
        return $q.defer().promise;
    }
}

// Clase padre de las clases que obtienen listas de objetos
abstract class ConsumeService extends angularHTTP {
    list: object[];
    listRequest: any;
    constructor(protected angular: angularServices) {
        super(angular.http, angular.q);
        this.listRequest = [];
        this.list = [];
    }

}

class ArrayList extends angularHTTP {
    sticky: Sticky;
    pgItem: Array<number> = [];

    constructor(
        protected url: string = '',
        public list: Array<any> = [],
        public angular: angularServices = angularServices,
        public currentPage = 0,
        public limitTo = 8) {
        super(angular.http, angular.q);
        this.sticky = new Sticky();
    }

    get = (id: number = 0): ng.IPromise<any> => {
        let url: string;
        if (id != 0) {
            url = `${serviceRoot}${this.url}/${id}`;
        } else {
            url = `${serviceRoot}${this.url}`;
        }
        let sr: ServiceResquest = {
            method: 'GET',
            url: url,
            data: null,
            header: null,
            success: (data: any) => {
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    setPagination = (vLenght: number): void => {
        let numOfPages = vLenght / this.limitTo;
        console.log('paginas totales: ' + numOfPages)
        numOfPages = Math.ceil(numOfPages);
        for (var i = 0; i < numOfPages; i++) {
            this.pgItem[i] = i;
        }
    }

    getHttp = (id: number = 0): ng.IPromise<any> => {
        let url: string;
        if (id != 0) {
            url = `${serviceRoot}${this.url}/${id}`;
        } else {
            url = `${serviceRoot}${this.url}`;
        }
        return this.angular.http.get(url);
    }

    removeStatusIdIgualTo = (): void => {

    }

    removeId = (id: number): void => {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].id == id) {
                this.list.splice(i, 1);
            }
        }
    }

    statusIdIgualTo = (statusId: number): void => {
        let filterList: Array<any>;
        filterList = [];
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].statusId == statusId) {
                filterList.push(this.list[i]);
            }
        }
        this.list = filterList;
    }

    perfilIdIgualTo = (perfilId: number): void => {
        let filterList: Array<any>;
        filterList = [];
        for (var i = 0; i < this.list.length; i++) {
            let a: any = this.list[i];
            if (a.typeId == perfilId) {
                filterList.push(this.list[i]);
            }
        }
        this.list = filterList;
    }

    getDescFromArray = (id: number): string => {
        for (var i = 0; i < this.list.length; i++) {
            if (this, this.list[i].id == id) {
                return this.list[i].description;
            }
        }
        return '';
    }

    getNameFromArray = (id: number): string => {
        for (var i = 0; i < this.list.length; i++) {
            if (this, this.list[i].id == id) {
                return this.list[i].name;
            }
        }
        return '';
    }

    getById = (id: number): any => {
        /* array.forEach(element => {
            
        }); */
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].id == id) {
                return this.list[i];
            }
        }
    }
}

class PinMarkers extends ArrayList {

    constructor(url: string, public distance: number = 0, public latitude: number = 0, public longitude: number = 0) {
        super(url);
        if (this.distance != 0) {
            this.url = `${this.url}/${this.distance}/${this.latitude}/${this.longitude}`;
        }
    }
}

// Clase para imagenes
class Imagen extends angularHTTP {
    id: number;
    imagePath: string;
    statusId: number;
    imageName: string;
    contentBase64: string;
    forUpdate: boolean;

    constructor(
        public http: ng.IHttpService,
        public q: ng.IQService,
        public imageType: string,
        public userTypeId: number) {
        super(http, q);
        this.id = 0;
        this.imagePath = '';
        this.statusId = 3;
        this.imageName = '';
        this.contentBase64 = '';
        this.forUpdate = false;
    }

    setContentBase64 = (cb64: string): void => {
        if (cb64 != '') {
            this.forUpdate = true;
            this.contentBase64 = cb64;
        }
    }

    create = (): ng.IPromise<any> => {
        let data: any = {
            "userTypeId": this.userTypeId,
            "imageType": this.imageType,
            "imageName": this.imageName,
            "contentBase64": this.contentBase64
        }
        let sri: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}image`,
            data: data,
            header: null,
            success: (data: any) => {
                //swAlert('Success', 'Categoria actualizada', 'success');
                return data;
            },
            error: (error: any) => {
                //swAlert('Oops', 'La categoria no se ha podido actualizar\n trate nuevamente !!!', 'error');
                return error;
            }
        }

        return this.httpRequest(sri);
    }


}

class ImageCarousel extends Imagen {
    class: string;
    originalImageId: number;

    constructor(
        public http: ng.IHttpService,
        public q: ng.IQService,
        public imageType: string,
        public userTypeId: number) {

        super(http, q, imageType, userTypeId);
        this.class = '';
        this.originalImageId = 0;
    }
}

class Sticky {
    top: number;
    elements: number;
    height: number;
    enable: boolean;

    constructor() {
        this.top = 0;
        this.elements = 0;
        this.height = 0;
        this.enable = false;
    }

    setElements = (): void => {
        this.elements++;
        this.top = -((this.elements - 1) * this.height) + 50;
    }
}