'use strict';

var sourceViewer = angular.module('sourceViewer', ['ngResource', 'ngRoute', 'ngSanitize']);

sourceViewer.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/main/:id?', {templateUrl: "partials/mainpage.html"})
        .when('/frontpage', {templateUrl: "partials/frontpage.html", controller: 'frontPageController'})
//        .when('/collapse', {templateUrl: "partials/app/collapse.html"})
//        .when('/proefExamen', {templateUrl: 'partials/app/proefexamen.html', controller: 'spelling-controller'})
//        .when('/oefenSpelling/:categoryId', {templateUrl: 'partials/app/spellingquestions.html', controller: 'spelling-controller'})
//        .when('/selectSpellingCategory/:type', {templateUrl: 'partials/app/selectCategory.html', controller: 'select-categorie-controller'})
//        .when('/selectWerkwoordCategory/:type', {templateUrl: 'partials/app/selectCategory.html', controller: 'select-categorie-controller'})
//        .when('/selectOvertypeCategory/:type', {templateUrl: 'partials/app/selectCategory.html', controller: 'select-categorie-controller'})
//        .when('/selectVeelgemaaktefoutenCategory/:type', {templateUrl: 'partials/app/selectCategory.html', controller: 'select-categorie-controller'})
//        .when('/oefenWerkwoorden/:werkwoordId/:type', {templateUrl: 'partials/app/werkwoordenquestions.html', controller: 'oefen-werkwoorden-controller'})
//        .when('/oefenOvertypen/:werkwoordId/:type', {templateUrl: 'partials/app/overtypenquestions.html', controller: 'oefen-werkwoorden-controller'})
//        .when('/oefenVeelgemaaktefouten/:werkwoordId/:type', {templateUrl: 'partials/app/veelgemaaktefoutenquestions.html', controller: 'oefen-werkwoorden-controller'})
//        .when('/settings', {templateUrl: 'partials/app/settings.html', controller: 'settings-controller'})
//        .when('/profile', {templateUrl: 'partials/app/profile.html', controller: 'settings-controller'})
//        .when('/eindscore', {templateUrl: 'partials/app/eindscore.html', controller: 'eindscore-controller'})
//        .when('/test', {templateUrl: 'partials/app/test.html'})
//        .when('/circle', {templateUrl: 'partials/app/circles.html'})
//        .when('/', {templateUrl: 'partials/app/home.html', controller: 'main-controller'})
//        .when('/directStarten', {templateUrl: 'partials/app/directStarten.html', controller: 'direct-starten-controller'})
//        .when('/beantwoorddevragen', {templateUrl: 'partials/app/beantwoorddevragen.html', controller: 'beantwoordde-vragen-controller'})
        .otherwise({redirectTo: '/frontpage'});
}]);