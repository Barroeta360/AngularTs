declare var Promise: any;
class GoogleMap {
    map: any;
    marker: Array<markerInstitution>;
    currentLocation: location;
    institution: Institutions;
    cityList: ArrayList;
    stateList: ArrayList;
    countryList: ArrayList;
    country: number;
    state: number;
    city: number;
    showCurrent: boolean = true;
    url:any;


    constructor(public angular: angularServices, public element: string) {
        this.currentLocation = {};
        this.url = '';
        this.getPosition().then((position) => {
            let lat: any = <number> position.coords.latitude;
            let lng: any = <number> position.coords.longitude
            this.currentLocation = { lat, lng };
        }).catch(() => {
            swAlert('Warning','It seems like Geolocation, which is required for this page, is not enabled in your browser.','error');    
        })
        .finally(() => {
            //valida si existe localizacion predefinida
            if(this.angular.ss.oLocator){
                //almaceno mi localizacion actual para futuras busqueda
                this.angular.ss.myLocation = this.currentLocation;
                //seteo la localizacion guardada como mi parametro de busqueda
                this.currentLocation = this.angular.ss.locator;
            }
            //si no consigue ninguna localizacion guardada o retornada por el geolocalitation
            if(this.currentLocation.lat == undefined){
                this.currentLocation = {
                    lat: 10.471675,
                    lng: -62.96623569999997
                }
                this.showCurrent = false;
            }
            var mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(this.currentLocation.lat, this.currentLocation.lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            //console.log(google.maps.MapTypeId);
            setTimeout(() => {
                if(document.getElementById(this.element)){
                    this.map = new google.maps.Map(document.getElementById(this.element), mapOptions);
                }
            }, 2000);
        });
        this.marker = [];
        this.institution = new Institutions(angular,0,0);



        //web location
        this.countryList = new ArrayList('country');
        this.cityList = new ArrayList('city');
        this.stateList = new ArrayList('state');
        this.country = 0;
        this.state = 0;
        this.city = 0;
        this.getCountry();
    }

    getCountry = ():void => {
        this.countryList.get().then((value:Array<any>) => {
            this.countryList.list = value;
            if(value.length == 1){
                this.country = value[0].id;
                console.log(this.country);
                this.getStateList(this.country);
            }
        })
    }

    getCities = (state: number): void => {
        this.state = state
        let state_id: number = state;
        this.cityList.get(state_id).then((r: any) => {
            console.log(r)
            this.cityList.list = r;
        }, (r: any) => {
            console.log(r);
            this.cityList = new ArrayList('city');
        })
    }

    getStateList = (country: number): void => {
        this.country = country;
        let id: number = country;
        this.stateList.get(id).then((r: any) => {
            console.log(r)
            this.stateList.list = r;
        }, (r: any) => {
            console.log(r);
            this.stateList = new ArrayList('state');
            this.cityList = new ArrayList('city');;
        })
    }

    setLocator = (): void => {
        this.angular.ss.oLocator = true;
        let locator: location = {
            lat: parseFloat(this.cityList.getById(this.city).latitude),
            lng: parseFloat(this.cityList.getById(this.city).longitude)
        }
        this.angular.ss.locator = locator;
        console.log(window.location.hash);
        location.reload()
    }

    setCurrent = ():void => {
        this.angular.ss.oLocator = false;
        location.reload()
    }

    setMapEvent = (e: string, cb: Function): void => {
        this.vMap().then(() => {
            google.maps.event.addListener(this.map, e, function (event) {
                cb(event.latLng);
            });
        })
    }


    getPosition = (o: any = null): any => {
        let p: any = new Promise(function (resolve, reject) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject, o);
            } else {
                this.currentLocation = {
                    lat: 10.471675,
                    lng: -62.96623569999997
                }
                swAlert('Warning','It seems like Geolocation, which is required for this page, is not enabled in your browser.','error');
            }

        })
        return p;
    }

    getCurrentLocation = (): ng.IPromise<location> => {
        let $d: ng.IDeferred<any> = this.angular.q.defer();
        let $p: ng.IPromise<location> = $d.promise;
        this.vMap().then(() => {
            $d.resolve(this.currentLocation);
        });
        return $p;
    }

    createMarker = (lc: any = {}, i: Institutions = new Institutions(this.angular, 0, 0)): void => {
        this.vMap().then(() => {
            if (!lc.lat || !lc.lng) {
                lc = this.currentLocation
            }

            let mI: markerInstitution = {
                marker: new google.maps.Marker({
                    position: lc,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    title: 'Prueba',
                    map: this.map
                }),
                institution: i
            }

            this.marker.push(mI);

            //this.marker.setMap(this.map);
        })
    }

    createMarkerClickable = (lc: any = {},cb: Function ,i: Institutions = new Institutions(this.angular, 0, 0)) => {
        this.vMap().then(() => {
            if (!lc.lat || !lc.lng) {
                lc = this.currentLocation
            }

            let mI: markerInstitution = {
                marker: new google.maps.Marker({
                    position: lc,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    title: (i.name)? i.name : 'Current',
                    map: this.map,
                    //label: `A${new Date().getHours}${new Date().getMinutes}${new Date().getSeconds}${new Date().getMilliseconds}`
                }),
                institution: i
            }
            mI.marker.addListener('click',(event) => {
                cb(mI)
            });

            this.marker.push(mI);

            //this.marker.setMap(this.map);
        })
    }

    markersCluster: Array<any> = [];

    getPins = (is: any,cb: Function) => {
        
        
        this.markersCluster = is.map((i) => {
            console.log(i);
            if(!i.institution){
                i.institution = new Institutions(this.angular, 0, 0);
            }
            let lc = {lat: i.lat, lng: i.lng};
            let mI: markerInstitution = {
                marker: new google.maps.Marker({
                    position: lc,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    title: (i.name)? i.name : (i.institution.name)? i.institution.name :'Current',
                    map: this.map
                }),
                institution: i.institution
            }
            mI.marker.addListener('click',(event) => {
                cb(mI)
            });

            this.marker.push(mI);
            return mI.marker;
        })
        
        var markerCluster = new MarkerClusterer(this.map, this.markersCluster,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    }

    animationMarket = (mI: markerInstitution) => {
        let $d: ng.IDeferred<any> = this.angular.q.defer();
        let $p: ng.IPromise<any> = $d.promise;
        mI.marker.setAnimation(google.maps.Animation.BOUNCE);
        this.institution.id = mI.institution.id;
        this.institution.name = mI.institution.name;
        this.institution.getInstitutionProfile().then((value:any) => {
            this.institution.getHeader().then((header:any) => {
                value.header = header;
                $d.resolve(value);
            }).catch((reason:any) => {
                mI.marker.setAnimation(null);
                swAlert('Error','Error al cargar la informacion de la institucion, \n trate nuevamente','error');
                $d.reject();
            });
        }).catch((reason:any) => {
            mI.marker.setAnimation(null);
            console.log(reason);
            swAlert('Error','Error al cargar la informacion de la institucion, \n trate nuevamente','error');
            $d.reject();
        });   

        $p.then((value) => {
            this.institution.description = this.angular.sce.trustAsHtml(value[0].description);
            this.institution.imageHeader.imagePath = value.header.originalImage;
            this.url = this.setUrl(this.institution);
            console.log(value);
            mI.marker.setAnimation(null);
            $('#map-modal').modal('show');
        })   
    }
    setUrl = (i: Institutions): string => {
        let url: string = `#/institutions?${i.id}-${i.name}`
        return  replaceAll(url,' ','_') //url;
    }
    createMarkerDragable = (lc: any = {},cb: any , i: Institutions = new Institutions(this.angular, 0, 0)): void => {
        this.vMap().then(() => {
            if (!lc.lat || !lc.lng) {
                lc = this.currentLocation
            }
            /*
            *
            * Fase dos mejorar Draggable y hacerlo funcional con el DOM nativo de javascript
              */
            let mI: markerInstitution = {
                marker: new google.maps.Marker({
                    position: lc,
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    title: 'Prueba',
                    map: this.map
                }),
                institution: i
            }

            this.marker.push(mI);

            mI.marker.addListener('dragend', (event) => {
                this.map.setZoom(16);
                this.map.setCenter(mI.marker.getPosition());
                cb(mI.marker.getPosition())
            })

            //this.marker.setMap(this.map);
        })
    }




    private vMap = (): ng.IPromise<boolean> => {
        let $d: ng.IDeferred<any> = this.angular.q.defer();
        let $p: ng.IPromise<boolean> = $d.promise;
        let b: boolean = false
        let i: any = null;
        i = setInterval(() => {
            if (this.element == 'no-map'){
                $d.resolve(true);
                clearInterval(i);
            }
            if (this.map != undefined) {
                $d.resolve(true);
                clearInterval(i);
            }
        }, 1500);

        return $p;
    }

}

interface location {
    lat?: number,
    lng?: number
}

interface markerInstitution {
    marker: any,
    institution: Institutions
}