'use strict';

describe('Testcase pManageCreditcardsWAApp -> Controllers -> ', function () {

    var scope = {};
    var $httpBackendNew;
    var rootScope;


    describe('TESTING CLOSE OK: LIST WITH 6 CARDS -> ', function () {

        beforeEach(function () {
            module('pManageCreditcardsWAApp', 'ngResource');
            inject(function ($rootScope, $httpBackend, $controller) {
                rootScope = $rootScope;
                scope = $rootScope.$new();
                scope.master = {};
                scope.baseUrl = '/app/p-manage-creditcards';
                $httpBackendNew = $httpBackend;


                $httpBackendNew.whenPOST('/app/p-manage-creditcards/close/cards').
                    respond(200, closeOK, {'Content-type': 'application/json'});

                $controller('pmanagecreditcards-opzeggen-step2-controller', {
                    $scope: scope
                });

            });
        });

        it('close OK', function () {

            scope.master.selectedCreditcard = {
                selectedCreditcard: {
                    prop6: '1111.****.****.1111'
                }
            };
            scope.$broadcast('handle-next-step-two');
            $httpBackendNew.flush();
            expect(scope.finished).toBe(true);
        });

    });

    describe('TESTING CLOSE ERROR: LIST WITH 6 CARDS -> ', function () {

        beforeEach(function () {
            module('pManageCreditcardsWAApp', 'ngResource');
            inject(function ($rootScope, $httpBackend, $controller, propertyService) {
                rootScope = $rootScope;
                scope = $rootScope.$new();
                scope.master = {};
                scope.baseUrl = '/app/p-manage-creditcards';
                scope.properties = propertyService.properties('pManageCreditcardsWAApp');
                $httpBackendNew = $httpBackend;

                $httpBackendNew.whenPOST('/app/p-manage-creditcards/close/cards').
                    respond(200, closeError, {'Content-type': 'application/json'});

                $controller('pmanagecreditcards-opzeggen-step2-controller', {
                    $scope: scope
                });
            });
        });

        it('close ERROR', function () {

            scope.master.selectedCreditcard = {
                selectedCreditcard: {
                    prop6: '1111.****.****.1111'
                }
            };
            scope.$broadcast('handle-next-step-two');
            $httpBackendNew.flush();
            expect(scope.finished).toBe(false);
            expect(scope.problemReportCfg.message).toContain('900');
        });
    });

});