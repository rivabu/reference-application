'use strict';

describe('Testcase pManageCreditcardsWAApp -> Controllers -> ', function () {

    var scope = {};
    var rootScope;
    var $myController;
    var mockWindow = {
        location: '/here.html'
    };

    describe('TESTING STEP3 CONTROLLER -> ', function () {

        beforeEach(function () {
            module('pManageCreditcardsWAApp', 'ngResource');
            inject(function ($rootScope, $httpBackend, $controller) {
                rootScope = $rootScope;
                scope = $rootScope.$new();

                $controller('pmanagecreditcards-opzeggen-step3-controller', {
                    $scope: scope,
                    $window: mockWindow
                });
                $myController = $controller;

            });
        });

        it('TEST toOverview', function () {
            expect(mockWindow.location).toBe('/here.html');
            scope.toOverview('/there.html');
            expect(mockWindow.location).toBe('/there.html');
        });

    });


});