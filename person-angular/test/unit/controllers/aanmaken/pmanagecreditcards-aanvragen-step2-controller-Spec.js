describe('pmanagecreditcards-aanvragen-step2-controller', function () {
    'use strict';

    var $controller, scope, $httpBackend, wizardScope, aChildScope, infoBrokerService, synchronizedDefered, $q;


    beforeEach(module('pManageCreditcardsWAApp'));

    beforeEach(inject(function (_$controller_, $rootScope, _$httpBackend_, _$q_) {
        $controller = _$controller_;
        $q = _$q_;
        synchronizedDefered = $q.defer();
        infoBrokerService = {
            info: {
                ingEmailInfo: {
                    emailAddress: 'email@adress.com'
                },
                ingServicePhoneInfo: {
                    phoneNumberMasked: '0654xxxx47'
                }
            },
            synchronize: function () {
                return synchronizedDefered.promise;
            }
        };

        wizardScope = $rootScope.$new();
        $controller('pmanagecreditcards-aanvragen-wizard-controller', {$scope: wizardScope});
        scope = wizardScope.$new();
        aChildScope = scope.$new();

        $httpBackend = _$httpBackend_;
    }));

    function initializeController() {
        $controller('pmanagecreditcards-aanvragen-step2-controller', {$scope: scope, infoBrokerService: infoBrokerService});
    }

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('when clicked on "next"', function () {

        var numberOfTimesCheckValidityCalled, numberOfTimesNextBroadcasted;

        function broadcastNextStep() {
            wizardScope.$broadcast('handle-next-step-two');
        }

        beforeEach(function () {
            numberOfTimesCheckValidityCalled = numberOfTimesNextBroadcasted = 0;

            aChildScope.$on('checkValidity', function () {
                numberOfTimesCheckValidityCalled++;
            });

            aChildScope.$on('wizardCtrl-navigate-next', function () {
                numberOfTimesNextBroadcasted++;
            });
            initializeController();
        });

        it('should broadcast "checkValidity"', function () {
            broadcastNextStep();
            expect(numberOfTimesCheckValidityCalled).toBe(1);
        });

        function doSynchronize() {
            synchronizedDefered.resolve();
            wizardScope.$digest();
        }

        function doSynchronizeFailed() {
            synchronizedDefered.reject();
            wizardScope.$digest();
        }

        it('should only broadcast "wizardCtrl-navigate-next" once when "handle-next-step-two" is broadcasted', function () {
            // Arrange
            broadcastNextStep();

            // Act
            // Het was mogelijk om stappen over te slaan bij 'dubbel' klikken op volgende
            broadcastNextStep();
            doSynchronize();

            // Assert
            expect(numberOfTimesNextBroadcasted).toBe(1);
        });

        it('should broadcast "wizardCtrl-navigate-next" if first sync failed', function () {
            // Arrange
            broadcastNextStep();

            // Act
            doSynchronizeFailed();
            synchronizedDefered = $q.defer();
            broadcastNextStep();
            doSynchronize();

            // Assert
            expect(numberOfTimesNextBroadcasted).toBe(1);
        });
    });
});