'use strict';

angular.module('sourceViewer').factory('DataAccess', ['$q', '$resource', function ($q, $resource) {
    var resourceTree = $resource('/api/sourcetree/:id', {}, {
        getTree: {
            method: 'GET',
            isArray: false
        }
    });
    
    var resourceFile = $resource('/api/file/:id', {}, {
        getFile: {
            method: 'GET',
            isArray: false
        }
    });

    var resourceProjects = $resource('/project/list', {}, {
        getProjects: {
            method: 'GET',
            isArray: false
        }
    });

    var resourceDeleteProject = $resource('/project/:id', {}, {
        getProjects: {
            method: 'DELETE',
            isArray: false
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
    
    function getFile(id) {
        var deferred = $q.defer();

        resourceFile.get({id: id},
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
    
    
    function deleteProject(id) {
        var deferred = $q.defer();

        resourceDeleteProject.delete({id: id},
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
        getFile: getFile,
        deleteProject: deleteProject,
        getProjects: getProjects
    };
}])

