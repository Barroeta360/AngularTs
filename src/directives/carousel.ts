declare var Promise:any;
project.directive('carousel', function () {
    return {
        restrict: 'E',
        scope: {
            interval: '=',//tiempo en que va a realizarse el cambio de slide
            controls: '=',//controles //valor booleano que indica si se muestran los controles
            refers: '=',//indicadores de posicion // todavia sin funcionalidad
            slides: '=',//lista de item que apareceran en el carousel
            cname: '=',//carousel name
            cclass: '=',//clase para personalizar el carousel standar
            caption: '='//indica si se muestra el caption por defecto caption es true
        },
        templateUrl: 'includes/directives/carousel.html',
        link: function (scope, iElement, iAttrs) {
            /*
            * caption
            * */

            if(typeof scope.caption != 'boolean'){
                scope.caption = true
            }
            /*
            * Create de Slide of carousel
            * */
            class Slide {
                image: string = '';
                title: string = '';
                text: string = '';
                show: boolean = false;
                id: number = 0;
            }

            scope.items = []

            let i: number = 1;

            scope.slides.forEach(s => {
                let item: Slide = new Slide();
                item.image = s.image;
                item.text = s.text;
                item.title = s.title;
                item.id = s.id;
                if(i == 1) item.show = true;
                scope.items.push(item);
                i++;
            });

            console.log(scope.items);

            /*
            * Intervals
            * */
            

           let currentItem = 1
           let slideSize = scope.items.length;
            function addShow (i) {
                var id = scope.items[i].id;
                id = '#'+scope.cname+'-'+id
                $(id).addClass('show');
            }
            //addShow(0);

            function interval () {
                return setInterval(function() {
                    cleanSlides();
                    if(currentItem < slideSize){
                        currentItem++;
                    } else {
                        currentItem = 1;
                    }
                    addShow(currentItem - 1);
                    
                }, scope.interval)
            }
            
            function cleanSlides () {
                var id = '#'+scope.cname+' .item'
                $(id).removeClass('show');
            }
            let cInterval = interval();

            /*
            * Controls
            * */

            scope.control = function(action) {
                cleanSlides();
                clearInterval(cInterval);
                

                if(action == 1){ //goNext
                    if(currentItem < slideSize){
                        currentItem++;
                    } else {
                        currentItem = 1;
                    }

                } else { //goBack
                    if(currentItem != 1){
                        currentItem--;
                    } else {
                        currentItem = slideSize;
                    }
                }
                addShow(currentItem - 1)
                cInterval = interval();
            }


        }
    }
})