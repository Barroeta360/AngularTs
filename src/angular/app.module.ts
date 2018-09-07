
/*
let angular:any = angular;*/

/* Variables y objetos no declarables para typescript */
declare var swal: any;
//let swal: any = swal;
declare var google: any;
declare var MarkerClusterer: any;

let project: any = angular.module('project', [
    'ngStorage',
    'ngAnimate',
    'ui.bootstrap',
    'chieffancypants.loadingBar',
    'ui.router',
    'oc.lazyLoad',
    'datatables',
    'ladda',
    '720kb.tooltips',
    'hl.sticky',
	'angularjs-dropdown-multiselect',
    'textAngular'

]);


