'use strict';

/* Services */

/*
 http://docs.angularjs.org/api/ngResource.$resource

 Default ngResources are defined as

 'get':    {method:'GET'},
 'save':   {method:'POST'},
 'query':  {method:'GET', isArray:true},
 'remove': {method:'DELETE'},
 'delete': {method:'DELETE'}

 */

var services = angular.module('ngdemo.services', ['ngResource']);

services.factory('DummyFactory', function ($resource) {
    return $resource('/ngdemo/web/dummy', {}, {
        query: { method: 'GET', params: {}, isArray: false }
    })
});

// UsersFactory
services.factory('UsersFactory', function ($resource) {
    return $resource('/person/list', {}, {
        query: { method: 'GET', isArray: true, headers: {'Access-Control-Allow-Origin':true} }
    })
});

// UserFactory
services.factory('UserFactory', function ($resource) {
    return $resource('/person/user/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT' },
        delete: { method: 'DELETE', params: {id: '@id'} },
        create: { method: 'POST' }
    })
});
