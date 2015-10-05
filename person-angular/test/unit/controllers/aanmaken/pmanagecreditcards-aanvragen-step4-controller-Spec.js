describe('pmanagecreditcards-aanvragen-step4-controller', function () {
    'use strict';

    var $controller, scope, wizardScope, aChildScope, $httpBackend, progressService, json = { 'content-type': 'application/json'};

    beforeEach(module('pManageCreditcardsWAApp'));

    beforeEach(inject(function (_$controller_, $rootScope, _$httpBackend_, _progressService_) {
        $controller = _$controller_;
        wizardScope = $rootScope.$new();
        $controller('pmanagecreditcards-aanvragen-wizard-controller', {$scope: wizardScope});
        scope = wizardScope.$new();
        aChildScope = scope.$new();
        progressService = _progressService_;
        $httpBackend = _$httpBackend_;

        $httpBackend.whenPOST('/app/p-manage-creditcards/aanvragen/initialize').respond({
            authorizationRequestId: 'anAuthorizationRequestId'
        });
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    function initializeController() {
        $controller('pmanagecreditcards-aanvragen-step4-controller', {$scope: scope});
        $httpBackend.flush();
    }

    describe('init', function () {
        it('should initialize credit card authorization', function () {
            var expectedAuthId = '213sdag321';
            $httpBackend.expectPOST('/app/p-manage-creditcards/aanvragen/initialize').respond(200, { authorizationRequestId: expectedAuthId }, json);
            initializeController();

            expect(scope.tanRequestId).toBe(expectedAuthId);
        });
    });

    describe('actions', function () {


        function signalTan(tanResult) {
            wizardScope.$broadcast('resultSendTan', tanResult);
        }

        function signalTanError() {
            signalTan({});
        }

        function signalTanSuccess() {
            signalTan({ tanok: true });
        }

        function signalTanHasMessage() {
            signalTan({ tanok: true, messageIndication: true });
        }

        beforeEach(initializeController);

        describe('when send', function () {
            var sendTanBroadcastedOnChildScope, sendTanBroadcastedOnParentScope;

            beforeEach(function () {
                sendTanBroadcastedOnParentScope = sendTanBroadcastedOnChildScope = false;
                wizardScope.$on('sendTan', function () {
                    sendTanBroadcastedOnParentScope = true;
                });
                aChildScope.$on('sendTan', function () {
                    sendTanBroadcastedOnChildScope = true;
                });
            });

            it('should broadcast "sendTan" to child scope', function () {
                // Act
                scope.send();

                // Assert
                expect(sendTanBroadcastedOnChildScope).toBe(true);
                expect(sendTanBroadcastedOnParentScope).toBe(false);
            });
        });


        describe('when navigating', function () {
            var navigateNextBroadcasted, navigatePreviousBroadcasted;

            beforeEach(function () {
                navigateNextBroadcasted = navigatePreviousBroadcasted = false;
                wizardScope.$on('wizardCtrl-navigate-next', function () {
                    navigateNextBroadcasted = true;
                });
                wizardScope.$on('wizardCtrl-navigate-previous', function () {
                    navigatePreviousBroadcasted = true;
                });
            });

            describe('next', function () {
                it('should broadcast "wizardCtrl-navigate-next"', function () {
                    // Act
                    scope.next();

                    // Assert
                    expect(navigateNextBroadcasted).toBe(true);
                });

                it('should broadcast "wizardCtrl-navigate-previous" when there are tanErrors', function () {
                    // Arrange
                    signalTanError();

                    // Act
                    scope.next();

                    // Assert
                    expect(navigatePreviousBroadcasted).toBe(true);
                });

                it('should broadcast "wizardCtrl-navigate-next" when tan was OK', function(){
                    // Act
                    signalTanSuccess();

                    // Assert
                    expect(navigateNextBroadcasted).toBe(true);
                });
            });

            describe('cancel', function () {
                it('should broadcast "wizardCtrl-navigate-previous"', function () {
                    // Act
                    scope.cancel();

                    // Assert
                    expect(navigatePreviousBroadcasted).toBe(true);
                });

                it('should disable cancel when tan resolved in a message indicator', function () {
                    // Act
                    signalTanHasMessage();
                    scope.cancel();

                    // Assert
                    expect(navigatePreviousBroadcasted).toBe(false);
                    expect(scope.mayCancel).toBe(false);
                });
            });

        });

    });


});