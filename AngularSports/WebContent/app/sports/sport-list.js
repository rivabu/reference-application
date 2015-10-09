(function() {
  'use strict'
  
  angular
    .module('app.sports')
    .controller('SportList', ['$scope', 'dataAccess', SportList]);
  
  function SportList($scope, dataAccess) {
    var vm = this;

    vm.sports = [];
    vm.chosenSport = null;

    vm.getSport = getSport;
    
    getAllSports();
    
    $scope.$on('sport.close', function() {
      vm.chosenSport = null;
    });
    
    function getAllSports() {
      dataAccess.getAllSports().then(function (data) {
        vm.sports = data;
      });
    }

    function getSport(sportId) {
      dataAccess.getSport(sportId).then(function (data) {
        vm.chosenSport = data;
      });
    }
    
  };
}());