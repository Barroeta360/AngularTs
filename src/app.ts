//general
let path: string = window.location.search.replace('?', '');
let pathData: any;
let angularServices: angularServices;
let load: Function;
let dataUrl: Function;
let loc: Function;
let routeImg: string = 'http://www.waychile.cl';

// para el consumo del serivicio
interface ServiceResquest {
    method: string,
    url: string,
    data: any,
    header: any,
    success: Function,
    error: Function
}
// clase relacionada con los dias que se manejaran en la aplicacion
class Days {
    list: any[] = [
        { dia: "Lunes", id: 1 },
        { dia: "Martes", id: 2 },
        { dia: "Miercoles", id: 3 },
        { dia: "Jueves", id: 4 },
        { dia: "Viernes", id: 5 },
        { dia: "Sabado", id: 6 },
        { dia: "Domingo", id: 7 },
    ];

    getDayDesc = (id: number) => {
        return this.list[id].dia;
    }

}
interface angularServices {
    rs: any,
    ss: any,
    http: ng.IHttpService,
    lazy: any,
    sce: ng.ISCEService,
    q: ng.IQService,
    location: ng.ILocationService,
    window: ng.IWindowService,
    localStorage: any;
    cookie: any
}


//funciones generales
let swAlert: Function = (title: string, message: string, type: string) => {
    return swal({
        title: title,
        text: message,
        icon: type,
        buttons: false,
        dangerMode: true,
    });
}
// retorna una promesa con un value = true || false;
let swConfirm: Function = (title: string, message: string, type: string = 'warning', cancel: boolean = true) => {

    return swal({
        title: title,
        text: message,
        icon: type,
        buttons: {
            cancel: {
                text: "Cancelar",
                value: false,
                visible: cancel,
                className: "",
                closeModal: true,
            },
            confirm: {
                text: "Confirmar",
                value: true,
                visible: true,
                className: "",
                closeModal: true
            }
        },
        dangerMode: true,
    })
}
// funcion que cierra los modals por id
let closeModal: Function = (id: string) => {
    $(id).modal('hide');
    $('.modal-backdrop').remove();
}

let openModal: Function = (id: string): void => {
    $(id).modal('show');
}

// le da formato al datatable de angular/bootstrap
let assembleTable: Function = (id: string = '') => {
    $(document).ready(function () {
        setTimeout(function () {
            $('select').addClass('form-control');
        }, 100);
    })
}
//tooltip bootstrap //REQUIRE POPPER.JS
$(document).ready(function () {
    $('.mbd-select').material_select();
});
//pad
let pad = (n: any, width: number, z: any = 0) => {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
interface JQuery {
    material_select(): void,
}


// formatea la hora de 16:00:00 a 11:00 PM
let formatDate12 = (hour: any) => {
    //console.log(typeof hour);
    let lh: string = hour.split(':')[0];//[16 , 00 , 00 ]
    let lm: string = hour.split(':')[1];//[16 , 00 , 00 ]
    let h: number = parseInt(lh);
    //let m:number = parseInt(lm);
    let t: string;
    let ft: string;
    if (h > 12) {
        t = 'PM';
        h = h - 12;
        lh = `${h}`;
        lh = pad(lh, 2, '0');
    } else {
        t = 'AM';
    }

    lm = pad(lm, 2, '0');
    ft = `${lh}:${lm} ${t}`;
    return ft;
}

// formatea la hora de DateTime o string a 11:00 PM
let formatTime12 = (hour: any) => {
    //console.log(hour);
    let lh: string;
    let lm: string;
    if (typeof hour == 'string') {
        lh = hour.split(':')[0];//[16 , 00 , 00 ]
        lm = hour.split(':')[1];//[16 , 00 , 00 ]
    } else {
        lh = `${hour.getHours()}`
        lm = `${hour.getMinutes()}`
    }
    let h: number = parseInt(lh);
    //let m:number = parseInt(lm);
    let t: string;
    let ft: string;
    if (h >= 12) {
        t = 'PM';
        if (h > 12) h = h - 12;

        lh = `${h}`;
    } else {
        t = 'AM';
    }
    lh = pad(lh, 2, '0');
    lm = pad(lm, 2, '0');
    ft = `${lh}:${lm} ${t}`;
    return ft;
}
// formatea la imagen para que sea valida para el servicio
let formatImage = (id: string) => {
    let myImg: string = $(`#${id}`).css('background-image');
    if (myImg.indexOf('url(')) {
        myImg = myImg.replace(/^url\(['"](.+)['"]\)/, '$1');
    }
    /* console.log(myImg);*/
    return myImg;
}
let formatUrl = (data: string) => {
    let myImg: string = data;
    myImg = myImg.replace(/^url\(['"](.+)['"]\)/, '$1');
    myImg = (myImg.indexOf("data:image") >= 0) ? myImg : '';
    return myImg;
}
// optiene el nombre de una imagen de un input file
let nameImage = (id: string) => {
    let jId: any = document.getElementById(id);
    if (jId.files && jId.files.length > 0) {
        return jId.files[0].name;
    } else {
        return null;
    }
    //return document.getElementById(id).files[0].name;
}
// limpia el fondo de pantalla de un bloque
let cleanBG = (id: string) => {
    $(`#${id}`).css('background-image', 'none');
}
// fecha a string
let dateToString = (date: Date): string => {
    let stringDate: string;
    let y: string = date.getFullYear().toString();
    let m: string = pad((1 + date.getUTCMonth()).toString(), 2);
    let d: string = pad(date.getUTCDate().toString(), 2);
    stringDate = `${y}-${m}-${d}`;
    return stringDate;
}
let formatDate: Function = (date: string): Date => {
    if (angular.isString(date)) {
        let d: Array<string> = date.split('-');
        return new Date(parseInt(d[0]), parseInt(d[1]), parseInt(d[2]));
    } else if (angular.isDate(date)) {
        return new Date(date);
    } else {
        return new Date();
    }
}
//replaceAll
let replaceAll: Function = (anyVar: any, from: string, to: string): any => {
    let newVar: any = anyVar.split(from).join(to);
    return newVar;
}

//formatea un tiempo de tipo string a tipo time
let formatTime = (hour: string): Date => {
    return new Date(1970, 0, 1, parseInt(hour.split(':')[0]), parseInt(hour.split(':')[1]), 0)
}

//formatea un tiempo de tipo time a tipo string 24 horas
let timeToString = (time: Date): string => {
    let hour: String = new String(time.getHours());
    let minutes: String = new String(time.getMinutes());
    hour = pad(hour, 2);
    minutes = pad(minutes, 2);
    return `${hour}:${minutes}:00`
}

let toInt = (a: any): number => {
    return parseInt(a);
}

let getKilometros = (lat1, lon1, lat2, lon2): number => {
    let rad = function (x) { return x * Math.PI / 180; }
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d: number = R * c;
    return parseFloat(d.toFixed(3)); //Retorna tres decimales
}

let createCookie = (name: string, value: any, time: number = 1, hourOrDay: string = 'd'): void => {
    let d: Date = new Date();
    let str = `${name}=${value};`;
    if (hourOrDay = 'd') {
        d.setDate(d.getDate() + time);
    } else {
        d.setHours(d.getHours() + time);
    }
    str += `expires=${d.toUTCString()}`;
    document.cookie = str;
}

let readCookie = (name: string): string => {
    let cookies: Array<any> = document.cookie.split(';');
    let myCookie: any = '';
    cookies.forEach(c => {
        c = c.split('=');
        c[0] = c[0].trim();
        if (c[0] == name) {
            myCookie = c[1];
        }
    })
    return myCookie;
}

let deleteCookie = (name: string): void => {
    let cookies: Array<any> = document.cookie.split(';');
    cookies.forEach(c => {
        c = c.split('=');
        c[0] = c[0].trim();
        if (c[0] == name) {
            let d: Date = new Date();
            let str = `${name}=;`;
            d.setFullYear(d.getFullYear() - 1);
            str += `expires=${d.toUTCString()}`;
            document.cookie = str;
        }
    })
}

// fecha a string
let dateToText = (date: Date): string => {
    let stringDate: string;
    let y: string = date.getFullYear().toString();
    let m: string = pad((1 + date.getUTCMonth()).toString(), 2);
    let d: string = pad(date.getUTCDate().toString(), 2);
    stringDate = `${y}-${m}-${d}`;
    return stringDate;
}

//get value by id
let getElementById = (id:string): any => {
    return (document.getElementById(id)) ? document.getElementById(id).value : '';
}