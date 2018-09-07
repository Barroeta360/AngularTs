class HourList extends ArrayList {
    hour: Hour;
    constructor(url: string,public institutionId: number ) {
        super(url);
        this.hour = new Hour(this.http, this.q, institutionId);
    }
    getList = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'GET',
            url: `${serviceRoot}institutionschedule/${this.institutionId}`,
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

    selectstartTimeList = (index: number): object => {
        return this.list[index];
    }

    push = (hour: Hour): void => {
        this.list.push(hour);
        this.angular.ss.institutions.hourList = this.list;
    }

    modify = (hour: Hour, index: number): void => {
        this.list[index] = hour;
        this.angular.ss.institutions.hourList = this.list;
    }

    delete = (index: number): ng.IPromise<any> => {
        let $q: ng.IQService = this.angular.q;
        let $d: ng.IDeferred<any> = $q.defer();
        let $p: ng.IPromise<any> = $d.promise;
        this.list.splice(index, 1);
        this.angular.ss.institutions.hourList = this.list;
        $d.resolve(this.list);
        return $p;
    }
}

class Hour extends ModelService {
    hourId: number;
    dayId: number;
    startTime: Date;
    endTime: Date;

    constructor(http: ng.IHttpService, q: ng.IQService, public institutionId: number) {
        super(http, q);
        this.hourId = 0;
        this.dayId = 0;
        this.startTime = this.formatTime('00:00');
        this.endTime = this.formatTime('00:00');
    }

    set = (data: any): void => {
        this.hourId = data.hourId;
        this.dayId = data.dayId;
        this.startTime = data.startTime;
        this.endTime = data.endTime;
        this.id = data.id;
    }

    formatTime = (hour: string): Date => {
        return new Date(1970, 0, 1, parseInt(hour.split(':')[0]), parseInt(hour.split(':')[1]), 0)
    }

    timeToString = (time: Date): string => {
        let hour: String = new String(time.getHours());
        let minutes: String = new String(time.getMinutes());
        hour = pad(hour, 2);
        minutes = pad(minutes, 2);
        return `${hour}:${minutes}:00`
    }

    create = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'POST',
            url: `${serviceRoot}institutionschedule`,
            data: {
                "institutionId": this.institutionId,
                "dayId": this.dayId,
                "startTime": this.timeToString(this.startTime),
                "endTime": this.timeToString(this.endTime)
            },
            header: null,
            success: (data: any) => {
                //swAlert('Success', 'Institucion Creada', 'success');
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }

    update = (): ng.IPromise<any> => {
        let sr: ServiceResquest = {
            method: 'PUT',
            url: `${serviceRoot}institutionschedule/${this.id}`,
            data: {
                "institutionId": this.institutionId,
                "dayId": this.dayId,
                "startTime": this.timeToString(this.startTime),
                "endTime": this.timeToString(this.endTime),
                "statusId": 1
            },
            header: null,
            success: (data: any) => {
                //swAlert('Success', 'Institucion Creada', 'success');
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
            url: `${serviceRoot}institutionschedule/${this.id}`,
            data: null,
            header: null,
            success: (data: any) => {
                //swAlert('Success', 'Institucion Creada', 'success');
                return data;
            },
            error: (error: any) => {
                return error;
            }
        }
        return this.httpRequest(sr);
    }
} 