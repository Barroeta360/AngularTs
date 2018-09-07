wayChile.directive('dropdown', function () {
    return {
        restrict: 'A',
        scope: {
            target: '@',
            /* ladda : '=',
            callback: '=', */
            dclass: '='
        },
        link: function (scope, iElement, iAttrs) {
            /* console.log(scope);
            console.log(iElement);
            console.log(iAttrs);
            console.log(iElement.classList);
            console.log(scope.dclass); */
            iElement.on("click", function (e) {
                //console.log(scope.target)
                var ce = document.getElementById(scope.target);
                var d = document.getElementById(iAttrs.id);
                var c;
                if(d) c = d.className;
                var match = c.indexOf('d-close');
                //console.log((ce) ? ce.className : 'no match');
                if (match != -1) {
                    //cuando se hace click en cualquier otro elemento que no sea un dropdown
                    //removemos la clase show de todos los elementos dropdown-menu-chile         
                    var dropdowns = document.getElementsByClassName("dropdown-menu-chile");
                    var i;
                    for (i = 0; i < dropdowns.length; i++) {
                        var openDropdown = dropdowns[i];
                        if (openDropdown.classList.contains('show')) {
                            openDropdown.classList.remove('show');
                        }
                    }
                    //cambiamos la clase d-open por la clase d-close para resetear todos los cerrados
                    var dropdowns = document.getElementsByClassName("dropdown-chile");
                    var i;
                    for (i = 0; i < dropdowns.length; i++) {
                        var openDropdown = dropdowns[i];
                        if (openDropdown.classList.contains('d-open')) {
                            openDropdown.classList.remove('d-open');
                            openDropdown.classList.add('d-close');
                        }
                    }
                    if (ce) {
                        $(`#${scope.target}`).addClass('show');
                        $(`#${iAttrs.id}`).removeClass('d-close');
                        $(`#${iAttrs.id}`).addClass('d-open');
                    }
                } else if(c.indexOf('d-close') == -1){
                    $(`#${scope.target}`).removeClass('show');
                    $(`#${iAttrs.id}`).addClass('d-close');
                    $(`#${iAttrs.id}`).removeClass('d-open');
                }
            })


        }
    }
})

