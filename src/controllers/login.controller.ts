
class LoginController {
    angular: angularServices;
    buttonModalLadda: boolean = false;
    user: User;
    modalId: string;
    constructor(angular: angularServices) {
        this.angular = angular;
        this.modalId = 'login-modal';
        this.user = new User(this.angular.http, this.angular.q);
        //console.log(pathData.split(';'));
        let state: string = window.location.hash.replace('#', '').split('?')[0];
        if(!pathData && (state == '/newuser' || state == '/newpassword')){
            this.angular.window.location.href = '#/login';
        }else if(state == '/newuser' || state == '/newpassword'){
            this.user.token = pathData.split(';')[0];
            this.user.email = pathData.split(';')[1];
        }
        this.validateLogin();
    }

    validateLogin = (): void => {
        let c:string = readCookie('type');
        if(c || c != ''){
            this.angular.window.location.href = '#/home';
        }
    }

    changePassword = (): void => {
        this.user.changePassword().then((value: any) => {
            this.angular.window.location.href = '#/login';
        })

    }

    login = (): void => {
        this.user.login().then((value: any) => {
            console.log(value);
            this.angular.ss.user = value;
            createCookie('  type',value.user.type,1);
            createCookie('htkn',value.token,1);
            //this.angular.ss.clientId = value.clientId; 
            if(value.user.type == 2)  this.angular.window.location.href = '#/home';
            if(value.user.type == 1)  this.angular.window.location.href = '#/promo';
        }).catch((reason: any) => {
            console.log(reason);
        })
    }

    recoverPassword = (): void => {
        console.log(this.user);
        this.user.recoverPassword().then((value:any) => {
            
        }).catch((reason:any) => {
            console.log(reason)
        })
    }
    sendMail = (): void => {
        this.user.register().then((value:string) => {
            console.log(value);
            this.angular.window.location.href = '#/login';
        }).catch((reason:any) => {
            console.log(reason);
        })
    }

    createUser = (): void => {
        this.user.create().then((value:string) => {
            console.log(value);
            this.angular.window.location.href = '#/login';
        }).catch((reason:any) => {
            console.log(reason);
        })
    }

    createClient = ():void => {
        this.createUser();
        console.log(this.user.client);
    }

    formatPhone = (n:any,ele:any) => {
        let e: any;
        let el : any = document.getElementById(n);
        if(el){
            e = getElementById(n);
        }
        console.log(e);
        let size: number = e.length;
        switch (size) {
            case 3:
                //alert('tercera letra');
                el.value = e+'-';
                break;
            case  7:
                el.value = e+'.';
                break;
            case  10:
                el.value = e+'.';
                break;
            default:
                break;
        }

    }
}