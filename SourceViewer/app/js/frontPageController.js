sourceViewer.controller('frontPageController', ['$rootScope', '$location', 'DataAccess', '$scope', function ($rootScope, $location, DataAccess, $scope) {

    $scope.projecten = [
                        {"name": "Anular sports", "id": 1, "description" : "voorbeeld van een angular project"},
                        {"name": "MongoDB queries", "id": 2, "description" : "voorbeeld queries mongodb"}
                        ];
    
    $scope.showProject = function(id) {
    	console.log('project selected with id: ' + id);
    	var url = '/main/' + id;
//    	$rootScope.$apply(function() {
    		$location.path(url);
    		console.log('location path: ' + url);
//    	});
    }
}]);


