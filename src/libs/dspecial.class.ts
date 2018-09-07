
class DailySpecial extends ModelService {
    title: string;
    description: string;
    selectedMonday: any;
    selectedTuesday: any;
    selectedWednesday: any;
    selectedThursday: any;
    selectedFriday: any;
    selectedSaturday: any;
    selectedSunday: any;
    specialDailyFrom: Date;
    specialDailyTo: Date;

    constructor(http: ng.IHttpService, q: ng.IQService, private institutionId: number) {
        super(http, q);
        this.title = '';
        this.description = '';
        this.selectedMonday = 0;
        this.selectedTuesday = 0;
        this.selectedWednesday = 0;
        this.selectedThursday = 0;
        this.selectedFriday = 0;
        this.selectedSaturday = 0;
        this.selectedSunday = 0;
        this.specialDailyFrom = formatTime('00:00');
        this.specialDailyTo = formatTime('00:00');
    }

    get = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'GET',
            url: `${serviceRoot}specialdaily/${this.institutionId}`,
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

    create = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}specialdaily`,
            data: {
                "institutionId": this.institutionId,
                "title": this.title,
                "description": this.description,
                "selectedMonday": (this.selectedMonday)? 1 : 0,
                "selectedTuesday": (this.selectedTuesday)? 1 : 0,
                "selectedWednesday": (this.selectedWednesday)? 1 : 0,
                "selectedThursday": (this.selectedThursday)? 1 : 0,
                "selectedFriday": (this.selectedFriday)? 1 : 0,
                "selectedSaturday": (this.selectedSaturday)? 1 : 0,
                "selectedSunday": (this.selectedSunday)? 1 : 0,
                "specialDailyFrom": (typeof this.specialDailyFrom == 'string') ? this.specialDailyFrom : timeToString(this.specialDailyFrom),
                "specialDailyTo": (typeof this.specialDailyTo == 'string') ? this.specialDailyTo : timeToString(this.specialDailyTo)
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Daily Special registrado!!!', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'El Daily Special no se han podido crear\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        console.log(sr);
        return this.httpRequest(sr);
    }

    set = (data: any): void => {
        console.log(data);
        if (data) {
            this.id = data.id;
            this.statusId = data.statusId;
            if(data.institutionId){
                this.institutionId = data.institutionId;
            }
            this.title = data.title;
            this.description = data.description;
            this.selectedMonday = (data.selectedMonday == 1)? true:false;
            this.selectedTuesday = (data.selectedTuesday == 1)? true:false;
            this.selectedWednesday = (data.selectedWednesday == 1)? true:false;
            this.selectedThursday = (data.selectedThursday == 1)? true:false;
            this.selectedFriday = (data.selectedFriday == 1)? true:false;
            this.selectedSaturday = (data.selectedSaturday == 1)? true:false;
            this.selectedSunday = (data.selectedSunday == 1)? true:false;
            this.specialDailyFrom = (typeof data.specialDailyFrom == 'string') ? formatTime(data.specialDailyFrom) : data.specialDailyFrom;
            this.specialDailyTo = (typeof data.specialDailyTo == 'string') ? formatTime(data.specialDailyTo) : data.specialDailyTo;
        }
        console.log(this)
    }

    update = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}specialdaily/${this.id}`,
            data: {
                "statusId": this.statusId,
                "institutionId": this.institutionId,
                "title": this.title,
                "description": this.description,
                "selectedMonday": (this.selectedMonday)? 1 : 0,
                "selectedTuesday": (this.selectedTuesday)? 1 : 0,
                "selectedWednesday": (this.selectedWednesday)? 1 : 0,
                "selectedThursday": (this.selectedThursday)? 1 : 0,
                "selectedFriday": (this.selectedFriday)? 1 : 0,
                "selectedSaturday": (this.selectedSaturday)? 1 : 0,
                "selectedSunday": (this.selectedSunday)? 1 : 0,
                "specialDailyFrom": (typeof this.specialDailyFrom == 'string') ? this.specialDailyFrom : timeToString(this.specialDailyFrom),
                "specialDailyTo": (typeof this.specialDailyTo == 'string') ? this.specialDailyTo : timeToString(this.specialDailyTo)
            },
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Daily Special Actualizados', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'El Daily Special no se han podido Actualizar\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        JSON.stringify(sr.data)
        return this.httpRequest(sr);
    }

    delete = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'DELETE',
            url: `${serviceRoot}specialdaily/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                swAlert('Success', 'Daily Special Eliminados!!!', 'success');
                return data;
            },
            error: (error: any) => {
                swAlert('Oops', 'El Daily Special no se han podido Eliminar\n trate nuevamente !!!', 'error');
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    getTime = (from: any, to: any): string => {
        let time: string = `${formatTime12(from)} - ${formatTime12(to)}`;
        return time;
    }

    getStringDates = (ds: DailySpecial): string => {
        let d: string = '';
        let da: Array<string> = [];

        if(ds.selectedMonday == 1){
            da.push('Lunes')
        }
        if(ds.selectedTuesday == 1){
            da.push('Martes')
        }
        if(ds.selectedWednesday == 1){
            da.push('Miercoles')
        }
        if(ds.selectedThursday == 1){
            da.push('Jueves')
        }
        if(ds.selectedFriday == 1){
            da.push('Viernes')
        }
        if(ds.selectedSaturday == 1){
            da.push('Sabado')
        }
        if(ds.selectedSunday == 1){
            da.push('Domingo')
        }
        d = da.join(' - ');
        return d;
    }

}