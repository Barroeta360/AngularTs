"use strict";
project.directive('dropdown', function () {
    return {
        restrict: 'A',
        scope: {
            target: '@',
            dclass: '='
        },
        link: function (scope, iElement, iAttrs) {
            iElement.on("click", function (e) {
                var ce = document.getElementById(scope.target);
                var d = document.getElementById(iAttrs.id);
                var c;
                if (d)
                    c = d.className;
                var match = c.indexOf('d-close');
                if (match != -1) {
                    var dropdowns = document.getElementsByClassName("dropdown-menu-chile");
                    var i;
                    for (i = 0; i < dropdowns.length; i++) {
                        var openDropdown = dropdowns[i];
                        if (openDropdown.classList.contains('show')) {
                            openDropdown.classList.remove('show');
                        }
                    }
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
                        $("#" + scope.target).addClass('show');
                        $("#" + iAttrs.id).removeClass('d-close');
                        $("#" + iAttrs.id).addClass('d-open');
                    }
                }
                else if (c.indexOf('d-close') == -1) {
                    $("#" + scope.target).removeClass('show');
                    $("#" + iAttrs.id).addClass('d-close');
                    $("#" + iAttrs.id).removeClass('d-open');
                }
            });
        }
    };
});
