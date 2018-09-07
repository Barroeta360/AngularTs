require.config({

  baseUrl: "js",
  
  // alias libraries paths.  Must set 'angular'
  paths: {
    'angular': '/js/angular.min',
    'angularAMD': '/js/dependecies/angularAMD.min',
    'angular-ui-router': '/js/dependecies/angular-ui-router.min'
  },

  // Add angular modules that does not support AMD out of the box, put it in a shim
  shim: {
    'angular-ui-router': ['angular']
  },

  // kick start application
  deps: ['app']
});