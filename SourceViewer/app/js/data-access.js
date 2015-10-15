'use strict';

//// DataAccessFactory
//sourceViewer.factory('DataAccess', function ($resource) {
//    return $resource('/api/sourcetree', {}, {
//        query: { method: 'GET', isArray: true, headers: {'Access-Control-Allow-Origin':true} }
//    });
//});

angular.module('sourceViewer').factory('DataAccess', ['$q', '$resource', function ($q, $resource) {
    var resource = $resource('/api/sourcetree', {}, {
        getTree: {
            method: 'GET',
            isArray: false
        }
    });

    function getTree(id) {
        var deferred = $q.defer();

        resource.get({id: id},
            function (success) {
                deferred.resolve(success);
            },
            function (error) {
                deferred.reject(error);
            }
        );

        return deferred.promise;
    }

    return {
        getTree: getTree
    };
}])

