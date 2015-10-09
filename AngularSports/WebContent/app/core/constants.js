(function() {
  'use strict';
  
  angular
      .module('app.core')
      .constant('APP_VERSION', '3.0')
      .constant('URL', '//localhost:8080/api/v1/sports');
  
})();