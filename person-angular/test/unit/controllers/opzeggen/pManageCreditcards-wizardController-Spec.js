'use strict';

describe('Testcase pManageCreditcardsWAApp -> Controllers -> ', function () {

    var scope = {};
    var rootScope;


    describe('TESTING NAVIGATION -> ', function () {

        beforeEach(function () {
            module('pManageCreditcardsWAApp', 'ngResource');
            inject(function ($rootScope, $httpBackend, $controller) {
                rootScope = $rootScope;
                scope = $rootScope.$new();
                $controller('pmanagecreditcards-opzeggen-wizard-controller', {
                    $scope: scope
                });

            });
        });

        it('NEXT BUTTON', function () {
            var step = 'step-one';
            scope.$broadcast('wizardCtrl-on-next', step);
            step = 'step-two';
            scope.$broadcast('wizardCtrl-on-next', step);

        });


        it('BACK BUTTON', function () {
            scope.$broadcast('wizardCtrl-on-previous', 'step1');
        });

        it('masterStateErrorg', function () {
            scope.masterStateError();
            expect(scope.master.state).toBe('error');
        });

        it('masterStateLoading', function () {
            scope.masterStateLoading();
            expect(scope.master.state).toBe('loading');
        });

        it('masterStateOk', function () {
            scope.masterStateOk();
            expect(scope.master.state).toBe('ok');
        });

        it('setChannel', function () {
            scope.setChannel('internet');
            expect(scope.master.channel).toBe('internet');
            scope.setChannel('assisted');
            expect(scope.master.channel).toBe('assisted');
        });
    });
});