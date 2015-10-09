(function() {
  'use strict'
  
  angular
    .module('app.sports')
    .controller('EventMaintenance', ['$scope', 'dataAccess', EventMaintenance]);
  
  function EventMaintenance($scope, dataAccess) {
    var vm = this;
    
    vm.eventEditor = {}; 
    
    vm.chooseEvent = chooseEvent;
    vm.resetEventEditor = resetEventEditor;
    vm.closeEvents = closeEvents;
    vm.saveEvent = saveEvent;
    vm.removeEvent = removeEvent;
    
    $scope.$watch('sportsVm.chosenSport', function(newSport, oldSport) {
      if (newSport && newSport.id !== oldSport.id) {
        vm.resetEventEditor();
      }
    });

    function chooseEvent(event) {
      vm.eventEditor = _.clone(event);
    }

    function resetEventEditor() {
      vm.eventEditor = {};
    }

    function closeEvents() {
      $scope.$emit('sport.close')
    }

    function saveEvent(sport) {
      if (vm.eventEditor.id) {
        editEvent(sport);
      } else {
        addEvent(sport);
      }
    }

    function addEvent(sport) {
      dataAccess.addEvent(sport.id, vm.eventEditor).then(function(event) {
        sport.events.push(event);
        vm.resetEventEditor();
      })
    }
    
    function editEvent(sport) {
      dataAccess.editEvent(sport.id, vm.eventEditor).then(function() {
        var changedEvent = _.findWhere(sport.events, {id: vm.eventEditor.id});          
        changedEvent.name = vm.eventEditor.name;
        vm.resetEventEditor();
      })
    }
    
    function removeEvent(sport, event) {
      if (! confirm('Really delete ' + sport.name + ' / ' + event.name + '?') ) { return; }
      dataAccess.removeEvent(sport.id, event.id).then(function() {
        sport.events = _.without(sport.events, event);
      })
    }
    
  };
}());