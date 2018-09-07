
declare var Promise:any;
project.directive('mapHomeWay', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/maphomeway/maphomeway.html',
        link: function (scope, iElement, iAttrs) {

            /* function getPosition(options: any = null) {
                return new Promise(function (resolve, reject) {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(resolve, reject, options);
                    } else {
                        alert('It seems like Geolocation, which is required for this page, is not enabled in your browser.');
                    }

                });
            }
            getPosition().then((position) => {
                console.log(position);
                var mapOptions = {
                    zoom: 18,
                    center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
                console.log(google.maps.MapTypeId);
                scope.map = new google.maps.Map(document.getElementById('map-home'), mapOptions);
            }); */
        }
    }
})