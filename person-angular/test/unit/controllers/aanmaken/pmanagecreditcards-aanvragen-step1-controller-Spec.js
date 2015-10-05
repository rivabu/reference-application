describe('pmanagecreditcards-aanvragen-step1-controller', function () {
    'use strict';

    var $controller, scope, $httpBackend, accounts, progressService, wizardScope;

    beforeEach(module('pManageCreditcardsWAApp'));

    beforeEach(inject(function (_$controller_, $rootScope, _$httpBackend_, _progressService_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        progressService = _progressService_;

        wizardScope = $rootScope.$new();
        $controller('pmanagecreditcards-aanvragen-wizard-controller', {$scope: wizardScope});
        scope = wizardScope.$new();
        accounts = [];

        $httpBackend.whenGET('/app/p-manage-creditcards/authorizedaccounts').respond(200, accounts, { 'content-type': 'application/json' });
        progressService.account = undefined;
        progressService.creditCard = undefined;
    }));

    function initializeController() {
        $controller('pmanagecreditcards-aanvragen-step1-controller', {$scope: scope});
    }

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('account selector', function () {

        beforeEach(initializeController);

        it('should retrieve accounts', function () {
            // Arrange
            $httpBackend.expectGET('/app/p-manage-creditcards/authorizedaccounts').respond(accounts);

            // Act
            $httpBackend.flush();

            // Assert
            expect(scope.accounts).toEqualData(accounts);
        });

        it('should select account when it is the only account', function () {
            // Arrange
            var expectedAccount = { my: 'account'};
            accounts.push(expectedAccount);

            // Act
            $httpBackend.flush();

            // Assert
            expect(progressService.account).toEqualData(expectedAccount);
        });

        describe('with multiple accounts', function () {
            it('should not select the first account', function () {
                // Arrange
                accounts.push({});
                accounts.push({});

                // Act
                $httpBackend.flush();

                // Assert
                expect(progressService.account).toBeUndefined();
            });

            it('should set the account in the progress service when account is selected', function () {
                // Arrange
                var expectedAccount = { my: 'account'};

                // Act
                $httpBackend.flush();
                wizardScope.$broadcast('ing-rich-select-change-accountItemSelector', expectedAccount);

                // Assert
                expect(progressService.account).toEqualData(expectedAccount);

            });
        });


    });


    describe('creditcard selector', function () {

        beforeEach(initializeController);

        describe('when a creditcard gets selected', function () {
            it('should add creditcard to the progress service', function () {
                // Arrange
                var creditCard = {my: 'credit-card'};

                // Act
                $httpBackend.flush();
                wizardScope.$broadcast('ing-rich-select-change-creditCardItemSelector', creditCard);

                // Assert
                expect(progressService.creditCard).toEqualData(creditCard);
            });
        });

    });

    describe('next page', function () {

        var navigateNextIsBroadCasted = false;

        beforeEach(function () {
            initializeController();
            $httpBackend.flush();

            var aChildScope = scope.$new();
            aChildScope.$on('wizardCtrl-navigate-next', function () {
                navigateNextIsBroadCasted = true;
            });
        });

        it('should set isNextPageAvailable dependant on the progress', function () {

            function doAssert(expectedPageAvailable) {
                expect(!!scope.isNextPageAvailable()).toBe(expectedPageAvailable);
            }

            doAssert(false);
            progressService.account = {};
            doAssert(false);
            progressService.account = undefined;
            progressService.creditCard = {};
            doAssert(false);
            progressService.account = {};
            doAssert(true);
        });

        it('should broadcast "wizardCtrl-navigate-next" when "handle-next-step-one" is broadcasted', function () {
            // Arrange
            wizardScope.$broadcast('handle-next-step-one');

            // Assert
            expect(navigateNextIsBroadCasted).toBe(true);
        });


    });
});