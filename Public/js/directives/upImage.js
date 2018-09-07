"use strict";
project.directive('upImage', function () {
    return {
        restrict: 'A',
        scope: {
            image: '=',
            ladda: '=',
            callback: '='
        },
        link: function (scope, iElement, iAttrs) {
            iElement.on("change", function (e) {
                var _this = this;
                scope.ladda = true;
                dataUrl(iElement[0]).then(function (img) {
                    scope.image.imageName = img.name;
                    scope.image.setContentBase64(img.b64);
                    console.log(_this);
                    scope.image.create().then(function (value) {
                        scope.image.id = value.imageId;
                        if (scope.callback)
                            scope.callback(value.imageId);
                    }).catch(function (reason) {
                        console.log(reason);
                    }).finally(function () {
                        scope.ladda = false;
                    });
                });
            });
        }
    };
});
