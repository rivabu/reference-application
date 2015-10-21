'use strict';

//// DataAccessFactory
//sourceViewer.factory('DataAccess', function ($resource) {
//    return $resource('/api/sourcetree', {}, {
//        query: { method: 'GET', isArray: true, headers: {'Access-Control-Allow-Origin':true} }
//    });
//});
//UsersFactory
angular.module('sourceViewer').factory('ProjectsFactory', ['$q', '$resource', function ($q, $resource) {
    return $resource('/project/list', {}, {
        query: { method: 'GET', isArray: true, headers: {'Access-Control-Allow-Origin':true} }
    });
}]);

angular.module('sourceViewer').factory('DataAccess', ['$q', '$resource', function ($q, $resource) {
    var resourceTree = $resource('/api/sourcetree/:id', {}, {
        getTree: {
            method: 'GET',
            isArray: false
        }
    });

    var resourceProjects = $resource('/project/list', {}, {
        getProjects: {
            method: 'GET',
            isArray: true
        }
    });

    function getTree(id) {
        var deferred = $q.defer();

        resourceTree.get({id: id},
            function (success) {
        		console.log('success: ' + success);
                deferred.resolve(success);
            },
            function (error) {
            	console.log('error: ' + error);
                deferred.reject(error);
            }
        );

        return deferred.promise;
    }

    function getProjects() {
        var deferred = $q.defer();

        resourceProjects.get(
            function (success) {
        		console.log('success: ' + success);
                deferred.resolve(success);
            },
            function (error) {
            	console.log('error: ' + error);
                deferred.reject(error);
            }
        );

        return deferred.promise;
    }

    return {
        getTree: getTree,
        getProjects: getProjects
    };
}])

