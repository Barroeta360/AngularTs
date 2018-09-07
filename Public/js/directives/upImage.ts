wayChile.directive('upImage',function(){
    return {
        restrict: 'A',
        scope:{
            image : '=',
            ladda : '=',
            callback: '='
        },
        link: function(scope,iElement,iAttrs){
            /* console.log(scope);
            console.log(iElement);
            console.log(iAttrs); */
            
            iElement.on("change", function(e) {
                //Activacion del ladda
                scope.ladda = true;
                dataUrl(iElement[0]).then((img: any) => {
                    //Asignacion de valores traidos del dataUrl de la imagen de input file
                    scope.image.imageName = img.name;
                    scope.image.setContentBase64(img.b64);
                    console.log(this);
                    //creacion de la imagen en en servidor que nos retornara un imageId
                    scope.image.create().then((value: any) => {
                        scope.image.id = value.imageId;
                        if(scope.callback) scope.callback(value.imageId);
                    }).catch((reason: any) => {
                        console.log(reason)
                    }).finally(() => {
                        scope.ladda = false;
                    })
                })
            })
        }
    }
})

