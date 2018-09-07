"use strict";
$('.modal').on('hidden.bs.modal', function (e) {
    alert('me llamo 1');
    setTimeout(clearPadding, 500);
});
$('.modal').on('hide.bs.modal', function (e) {
    alert('me llamo 2');
    setTimeout(clearPadding, 500);
});
function clearPadding() {
    $('body').css('padding-right', '0px !important');
}
window.onclick = function (event) {
    if (event.target) {
        var catchE = event.target.className.indexOf('dropdown-chile');
        if (catchE == -1) {
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
        }
    }
};
