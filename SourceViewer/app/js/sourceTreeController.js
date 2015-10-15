'use strict';

//app.controller('DummyCtrl', ['$scope', 'DummyFactory', function ($scope, DummyFactory) {
//    $scope.bla = 'bla from controller';
//    DummyFactory.get({}, function (dummyFactory) {
//        $scope.name = dummyFactory.name;
//    });
//}]);



sourceViewer.controller('sourceTreeController', ['$rootScope', '$routeParams', '$location', 'DataAccess', '$scope', function ($rootScope, $routeParams, $location, DataAccess, $scope) {

    $scope.tree =  '';
    $scope.id = $routeParams.id;
    
    $scope.init = function () {
    	

    	$scope.getTree($scope.id);
    }
    
    /*
     * It's worth noting that $broadcast is used to delegate events to child or sibling scopes, whereas $emit will bubble events upwards to the scope's parents, hence;

		When choosing $broadcast (and not $emit), one should either inject the root scope for tying the $on (as you nicely did) or call $on on the receiver's isolated scope, be it a child scope of the dispatcher.
     */
    $scope.showFile= function (id) {
    	$rootScope.$broadcast('showFile', id);
    	console.log('showFile send');
    	console.log("file clicked: " + id);
    };
    
    $scope.openCloseDir= function (id) {
    	console.log("openCloseDir: " + id);
    	console.log("openCloseDir: " + $scope.tree);
    	angular.forEach($scope.tree, function (elem) {
    		console.log("elem: " + elem.id);
    		if (elem.id == id) {
    			if (elem.status == 'open') {
    				elem.status = 'closed';
    			} else {
    				elem.status = 'open';
    			}
    		}
    	})
    	$scope.parsedTree = parseTreeToHtml($scope.tree);
    };
    
     $scope.getTree = function (id) {
    	 
    	 DataAccess.getTree(id).then(function (result) {
    		 $scope.tree = result.tree;
    		 var result = parseTreeToHtml(result.tree);
    		 console.log(result);
    		 $scope.parsedTree = result;
    	 }, function (result) {
            console.log('error' + result);
         });
    	 
    };	
     
    function parseTreeToHtml(tree) {
    	var elements = tree;
     	var endresult = '<ul>';
     	for (var j in elements) {
            var type = elements[j].type;
			if (type === 'root') {
				endresult = endresult + '<li id=\'' + elements[j].id + '\' class=\'open\'><div class=\'dir open-close\'></div> <span class=\'dir open-close project\'>' + elements[j].name +'</span>'
		        endresult = endresult + '<ul>';
			}
			if (type === 'endroot') {
				endresult = endresult + '</ul>';
			}
			if (type === 'dir') {
				endresult = endresult + '<li id=\'' + elements[j].id + '\' class=\'' + elements[j].status + '\' ><div class=\'dir open-close\' ng-click=\"openCloseDir(\'' + elements[j].id + '\')\"></div> <span class=\'dir open-close folder\' ng-click=\"openCloseDir(\'' + elements[j].id + '\')\">' + elements[j].name +'</span>';
		        endresult = endresult + '<ul>';
			}
			if (type === 'enddir') {
				endresult = endresult + '</ul>';
			}
			if (type === 'node') {
				endresult = endresult + '<li id=\'' + elements[j].id + '\'><a href class=\'file ' + elements[j].ext + '\' ng-click=\"showFile(\'' + elements[j].name + '\')\">' + elements[j].name +'</a></li>';
			}
     	}
     	endresult = endresult + '</ul>';
     	endresult = endresult.replace(/\t/g, '');    	
     	return endresult;
    } 
    
    $scope.init();
    
}]);

//Here $watch used for automatic rendering, it listening directive's content value if content changed then it works. 
//If you think your directive works only single time then you don't need $watch. 
//Here $parse used for parsing the string content and $compile will link newly generated HTML with scope.

sourceViewer.directive('tree', function($compile, $parse) {
    return {
      restrict: 'E',
      link: function(scope, element, attr) {
        scope.$watch(attr.content, function() {
          element.html($parse(attr.content)(scope));
          $compile(element.contents())(scope);
        }, false);
      }
    }
  });

