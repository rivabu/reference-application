(function() {
  'use strict'
  
  angular
    .module('app.core')
    .controller('Footer', ['APP_VERSION', Footer]);
  
  function Footer(APP_VERSION) {
    var vm = this; 
    vm.version = APP_VERSION;
  }

}());