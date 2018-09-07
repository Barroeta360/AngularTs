
class IndexController extends Controller{
    test: string;

    constructor(angular:angularServices = angularServices){
        super(angular);
        console.log('i run');
        //createCookie('test',35,8);//2018-08-24T23:06:31.000Z
        deleteCookie('test');
        this.test = readCookie('test');
    }

}


/*categoryList:ArrayList;
    pinList: PinMarkers;
    promotionList: ArrayList;

    constructor(angular:angularServices){
        super(angular);
        this.angular = angular;
        //general

        //Carretes


        //Category
        this.categoryList = new ArrayList('category');
        this.getCategoryList();
        //Map
        this.addMarketToMap();
        // to avoid ts console error
        this.pinList = new PinMarkers('institutionlocator/map');
        this.getLocations();
        //Panoramas
        this.promotionList = new ArrayList('institutionlocator/promotion');
    }
    /*
    * Categoria
    *
   getCategoryList = () : void => {
    if(!this.angular.ss.ct){
        this.categoryList.get().then((r:any) => {
            this.categoryList.list = r;
            this.angular.ss.category = r;
            console.log(r);
        },(r:any) => {
            this.angular.ss.category = null;
            console.log(r);
        })
    }else{
        this.categoryList.list = [];
        if(this.angular.ss.category){
            this.categoryList.list = this.angular.ss.category;
        }
    }
}

categoryAction = (category:Category) : void => {
    this.angular.window.location.href = `#/category?${category.id}-${replaceAll(category.categoryTitle,' ','_')}`;
}

/*
* Mapa
*
addMarketToMap = (): void => {
    this.map.getCurrentLocation().then((l: location) => {
        this.map.createMarkerClickable(l,this.map.animationMarket);
        this.map.map.setZoom(14);
    })
}

getLocations = (): void => {
    this.map.getCurrentLocation().then((l:location) => {
        this.pinList = new PinMarkers('institutionlocator/map',5000,l.lat,l.lng);
        this.promotionList = new ArrayList(`institutionlocator/promotion/4/5000/${l.lat}/${l.lng}`);
        this.getPromotions();
        this.pinList.get().then((value: any) => {
            this.pinList.list = value;
            this.pinList.list.forEach((i) => {
                let l: location = {
                    lat: parseFloat(i.latitude) ,
                    lng: parseFloat(i.longitude)
                }
                let pi: Institutions = new Institutions(this.angular,0,0);
                pi.id = i.id;
                pi.name = i.name;
                this.map.createMarkerClickable(l,this.map.animationMarket,pi);
            })
        })
    })
}

/*
* Panoramas - Promociones
*

getPromotions = ():void => {
    this.promotionList.get().then((value:Array<any>) => {
        console.log(value);
        this.promotionList.list = this.setListPromotion(value);
    })
}

goURL = (i:any):void => {
    let url: string = `#/institutions?${i.institutionId}-${i.name}`
    return  replaceAll(url,' ','_') //url;
}

href = (i:any):void => {
    this.angular.window.location.href = replaceAll(`#/institutions?${i.institutionId}-${i.name}`,' ','_');
}
//this.angular.window.location.href = `#/category?${category.id}-${replaceAll(category.categoryTitle, ' ', '_')}`;

*/