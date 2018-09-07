project.controller('main', function () {
    //metodos generales de controladores
    this.showModal = (id: string) => {
        $(id).modal('show');
    }
    this.go = (state: string) => {
        //window.location = `#${state}`;
        //angularServices.location.url = `#${state}`;
        angularServices.window.href = `#${state}`;
    }

    this.console = (any: any) => {
        console.log(any);
    }

    // todas las funciones generales que se vayan a utilizar
    this.functions = new Object();
    this.functions.dias = new Days();
    this.functions.formatDate12 = formatDate12;
    this.functions.formatTime12 = formatTime12;
    this.functions.clearCache = () => {
        angularServices.ss.$reset();
    }

    this.rs = angularServices.rs;

    //this.imgRoute = 'http://www.waychile.cl/';

    /* angularServices.cookie.put('myTest',Math.random()*100000);
    this.app.myTest = angularServices.cookie.get('myTest'); */


    //recarga el controlador para cada vista (simula el resolve pero con el lazyload)
    this.init = () => {

        $('html, body').animate({
            scrollTop: 0//$('#body').offset().top
        }, 500);
        closeModal('#menuModal');
        $('.tooltip').remove();
        let myHash = window.location.hash.replace('#', '').split('?');

        if (myHash[0] == '/login') {
            this.rs.showComponent = false;
        } else {
            this.rs.showComponent = true;
        }
        
        pathData = myHash[1];

        switch (myHash[0]) {
            case '/home':
                this.app = new IndexController(angularServices);
                break;
            case '/login':
                this.app = new LoginController(angularServices);
                break;
            case '/test':
                //this.app = ';
                break;
            default:
                //this.app = new GeneralController(angularServices);

        };

    }

    //this.init();

});