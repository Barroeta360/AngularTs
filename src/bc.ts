$('.modal').on('hidden.bs.modal', function (e:any) {
    alert('me llamo 1');
    setTimeout(clearPadding,500);
})

$('.modal').on('hide.bs.modal', function (e:any) {
    alert('me llamo 2');
    setTimeout(clearPadding,500);
})

function clearPadding() {
    $('body').css('padding-right','0px !important');
}
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if(event.target){
      //optenemos el match del target que no sea clase 'dropdown-chile'
      var catchE = event.target.className.indexOf('dropdown-chile');
      if (catchE == -1) {
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
    }
    
  }
}

/*
// SideNav Button Initialization
$(".button-collapse").sideNav();
// SideNav Scrollbar Initialization
var sideNavScrollbar = document.querySelector('.custom-scrollbar');
Ps.initialize(sideNavScrollbar);
*/

