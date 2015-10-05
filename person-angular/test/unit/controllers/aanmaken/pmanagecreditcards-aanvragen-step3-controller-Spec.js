describe('pmanagecreditcards-aanvragen-step3-controller', function () {
    'use strict';

    var $controller, scope, progressService, $httpBackend, wizardScope, aChildScope;

    beforeEach(module('pManageCreditcardsWAApp'));

    beforeEach(inject(function (_$controller_, $rootScope, _$httpBackend_, _progressService_) {
        $controller = _$controller_;

        wizardScope = $rootScope.$new();
        $controller('pmanagecreditcards-aanvragen-wizard-controller', {$scope: wizardScope});
        scope = wizardScope.$new();
        aChildScope = scope.$new();

        $httpBackend = _$httpBackend_;
        progressService = _progressService_;

        progressService.account = { my: 'account' };
    }));

    function initializeController() {
        $controller('pmanagecreditcards-aanvragen-step3-controller', {$scope: scope});
    }

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('when clicked on "next"', function () {
        var wizardNextFired;
        beforeEach(function () {
            wizardNextFired = false;
            wizardScope.$on('wizardCtrl-navigate-next', function () {
                wizardNextFired = true;
            });
            initializeController();
        });

        function broadcastNext() {
            wizardScope.$broadcast('handle-next-step-three');
        }

        it('should broadcast "wizardCtrl-navigate-next" when accepted', function () {
            scope.accepted = true;
            broadcastNext();
            expect(wizardNextFired).toBe(true);
        });

        it('should not broadcast "wizardCtrl-navigate-next" when not accepted', function () {
            broadcastNext();
            expect(wizardNextFired).toBe(false);
            scope.accepted = false;
            expect(wizardNextFired).toBe(false);
        });

        it('should set accepted alert visible when not accepted', function () {
            broadcastNext();
            expect(scope.showAcceptedError).toBe(true);
        });
    });

    describe('when accepting terms and conditions', function () {
        beforeEach(function () {
            initializeController();
            scope.accepted = true;
            scope.$digest();
        });

        it('should not display alert visible when', function () {
            expect(scope.showAcceptedError).toBeFalsy();
        });

        describe('when again not accepting terms and conditions', function () {
            beforeEach(function(){
                // Arrange
                scope.accepted = false;

                // Act
                scope.$digest();
            });

            it('should display error message', function(){
                // Assert
                expect(scope.showAcceptedError).toBe(true);
            });

        });
    });

});