'use strict';

sourceViewer.controller('fileContentController', ['$rootScope',  'DataAccess', '$scope', '$base64', function ($rootScope,  DataAccess, $scope, $base64) {

    
  	$scope.found = false;	
  	$scope.content = '';
  	$scope.binary = false;
    
//    var Stub = $resource('/files/:filename', {}, {'getText': {
//        transformResponse: function(data, headersGetter, status) {
//            return {content: data};
//        }
//    }});

    $scope.getFileContent = function () {
//    	if ($scope.found  === false && $scope.content === '') {
//    		$scope.found = true;
//	    	Stub.getText({'filename': 'file.txt'}, function(response) {
//	            $scope.content = response.content;
//	        });
//    	}
    	return $scope.content;
    }	
     
    $rootScope.$on('showFile', function(event, data) {
    	console.log('showFile received:' + data);
		$scope.found = true;
		 DataAccess.getFile(data).then(function (result) {
			 
			 $scope.binary = result.binary;
			 console.log(result.encodedContent);
			 if (result.binary) {
				 console.log('binary file found');
				 $scope.content = result.encodedContent;
			 } else {
				 var decodedString = $base64.decode(result.encodedContent);
				 // decodedString = '<test>test</test>';
				 decodedString = decodedString.split('&').join('&amp;');
				 decodedString = decodedString.split('>').join('&gt;');
				 decodedString = decodedString.split('<').join('&lt;');
				
				 $scope.content = decodedString;
				 console.log(decodedString);
			 }
		 }, function (result) {
	        console.log('error' + result);
	     });
    	return $scope.content;
    	
    });
    
//    $rootScope.$on('showFile', function(event, data) {
//    	console.log('showFile received:' + data);
//		$scope.found = true;
//    	Stub.getText({'filename': data}, function(response) {
//            
//            $scope.content = response.content;
//        });
//    	return $scope.content;
//    	
//    });
    

}]);

