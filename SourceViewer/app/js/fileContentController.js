sourceViewer.controller('fileContentController', function ($scope, $rootScope, $resource) {

    
  	$scope.found = false;	
  	$scope.content = '';
    
    var Stub = $resource('/files/:filename', {}, {'getText': {
        transformResponse: function(data, headersGetter, status) {
            return {content: data};
        }
    }});

    $scope.getFileContent = function () {
    	if ($scope.found  === false && $scope.content === '') {
    		$scope.found = true;
	    	Stub.getText({'filename': 'file.txt'}, function(response) {
	            $scope.content = response.content;
	        });
    	}
    	return $scope.content;
    }	
     
    $rootScope.$on('showFile', function(event, data) {
    	console.log('showFile received:' + data);
    	//if ($scope.found  === false && $scope.content === '') {
    		$scope.found = true;
	    	Stub.getText({'filename': data}, function(response) {
	            
	            $scope.content = response.content;
	        });
    	//}
    	return $scope.content;
    	
    });
});

