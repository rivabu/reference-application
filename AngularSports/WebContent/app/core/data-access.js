(function() {
  'use strict'
  
  angular
    .module('app.core')
    .factory('dataAccess', ['$http', '$rootScope', 'URL',  dataAccess]);
  
  function dataAccess($http, $rootScope, URL) {
    
    var service = {
        getAllSports: getAllSports,
        getSport: getSport,
        addEvent: addEvent,
        editEvent: editEvent,
        removeEvent: removeEvent
    };

    return service;
      
    function getAllSports() {
      return $http.get(URL)
          .then(getDataFromResponse)
          .catch(exception);
    }
      
    function getSport(sportId) {
      return $http.get(URL + '/' + sportId)
          .then(getDataFromResponse)
          .catch(exception);
    }

    function addEvent(sportId, event) {
      return $http.post(URL + '/' + sportId, event)
          .then(getDataFromResponse)
          .catch(exception);
    }

    function editEvent(sportId, event) {
      return $http.put(URL + '/' + sportId, event)
          .catch(exception);
    }

    function removeEvent(sportId, eventId) {
      return $http.delete(URL + '/' + sportId + '/events/' + eventId)
          .catch(exception);
    }
    
    function getDataFromResponse(response, status, headers, config) {
      if (! response.data) {
        throw "no data from server";
      }
      return response.data;
    }
    
    function exception(message) {
      var reason = message.statusText ? message.statusText : message;
      $rootScope.error = "An error has occured (" + reason + "). Please try again later.";
    }
    
  };
}());