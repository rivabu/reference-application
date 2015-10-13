sourceViewer.controller('sourceTreeController', function ($rootScope, $scope, $location) {

    $scope.tree =  [    { id : 1212, type: 'root', name: 'Rients Test' }, 
    					{ id : 37980, type: 'dir', name: 'notes' },
    					{ id : 37981, type: 'node', ext: 'js', name: 'data.js' },
    					{ id : 37981, type: 'node', ext: 'txt', name: 'file.txt' },
    					{ id : 37981, type: 'node', ext: 'rd', name: 'readme.rd' },
    					{ id : 37982, type: 'node', ext: 'png', name: 'sports-snippet.png' },
    					{ id : 37983, type: 'node', ext: 'png', name: 'sports-v1.0.png' },
    					{ type: 'enddir' },
      					{ id : 37984, type: 'node', ext: 'xml', name: 'pom.xml' },
      					{ id : 37984, type: 'node', ext: 'rd', name: 'readme.rd' },
    					{ type: 'endroot' }
    				];
    
    /*
     * It's worth noting that $broadcast is used to delegate events to child or sibling scopes, whereas $emit will bubble events upwards to the scope's parents, hence;

		When choosing $broadcast (and not $emit), one should either inject the root scope for tying the $on (as you nicely did) or call $on on the receiver's isolated scope, be it a child scope of the dispatcher.
     */
    $scope.showFile= function (id) {
    	$rootScope.$broadcast('showFile', id);
    	console.log('showFile send');
    	console.log("file clicked: " + id);
    }
    
     $scope.getTree = function () {
     	var elements = $scope.tree;
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
				endresult = endresult + '<li id=\'' + elements[j].id + '\' class=\'open\'><div class=\'dir open-close\'></div> <span class=\'dir open-close folder\'>' + elements[j].name +'</span>';
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
    
});

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
        }, true);
      }
    }
  });

