'use strict';

var sourceViewer = angular.module('sourceViewer', ['ngResource', 'ngRoute', 'ngSanitize']);

sourceViewer.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/main/:projectId', {templateUrl: "partials/mainpage.html"})
        .when('/frontpage', {templateUrl: "partials/frontpage.html", controller: 'frontPageController'})
        .otherwise({redirectTo: '/frontpage'});
}]);