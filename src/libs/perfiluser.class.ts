class UserPerfilList {
    angular:any;
    list:object[];
    constructor(angular:any){
        this.angular = angular;
        this.list = [];
    }
    getList = () => {
        return this.angular.http.get(serviceRoot+'user/institution');
    }
    
}
    