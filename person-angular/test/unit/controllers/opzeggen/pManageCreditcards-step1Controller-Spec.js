'use strict';


describe('Testcase pManageCreditcardsWAApp -> Controllers -> ', function () {

    var scope = {};
    scope.masterStateLoading = function () {
    };
    var $httpBackendNew;
    var rootScope;

    describe('pmanagecreditcards-opzeggen-step1-controller -> ', function () {

        beforeEach(function () {
            module('pManageCreditcardsWAApp', 'ngResource');
            inject(function ($rootScope, $httpBackend, $controller, propertyService) {

                rootScope = $rootScope;
                scope = $rootScope.$new();
                scope.master = {};
                scope.masterStateLoading = function () {
                };
                scope.masterStateOk = function () {
                };
                scope.baseUrl = '/app/p-manage-creditcards';
                scope.imageUrl = 'css/images/';
                scope.masterStateError = function () {
                };

                scope.properties = propertyService.properties('pManageCreditcardsWAApp');
                $httpBackendNew = $httpBackend;

                $httpBackendNew.whenGET('/app/p-manage-creditcards/retrieve/cards?').
                    respond(200, creditcardsAll, {'Content-type': 'application/json'});

                $httpBackendNew.whenPOST('/app/p-manage-creditcards/verify/cards').
                    respond(200, verificationOK, {'Content-type': 'application/json'});

                $httpBackendNew.whenPOST('/app/p-manage-creditcards/determineclose/cards').
                    respond(200, determineClosePositiveBalance, {'Content-type': 'application/json'});

                $controller('pmanagecreditcards-opzeggen-step1-controller', {
                    $scope: scope
                });
                $httpBackendNew.flush();
            });
        });

        it('Verify initial setup creditcards', function () {
            expect(scope.properties).toBeDefined();
            expect(Object.keys(scope.properties).length).toBeGreaterThan(0);
            expect(scope.master.allCreditcardItems).toBeDefined();
            expect(scope.master.allCreditcardItems.length).toBe(7);
        });


        it('positief tegoed', function () {
            // POSITIEF TEGOED, BECAUSE OF determineCloseOK_positieveBalance and PRIMARY CARD
            expect(scope.master.selectedCreditcard).toBeUndefined();
            // execute event:
            var data = {cardIndex: 'test', prop1: '1.00', prop6: '1111.****.****.1111', type: 'PRIMARY'};
            scope.$broadcast('ing-rich-select-change-creditCardItemSelector', data);
            $httpBackendNew.flush();
            expect(scope.master.selectedCreditcard).toBe(data);
            expect(scope.master.positiefTegoedHoofdCreditcard).toBe(true);
            expect(scope.master.mogelijkLosGetarifeerd).toBe(false);
        });

        it('selecteer bijkaart, geen positief tegoed of possibly charged', function () {
            // ALL FALSE BECAUSE NO PRIMARY CARD
            expect(scope.master.selectedCreditcard).toBeUndefined();
            // execute event:
            var data = {cardIndex: 'test', prop1: '1.00', prop6: '1111.****.****.1111', type: 'SECONDARY'};
            scope.$broadcast('ing-rich-select-change-creditCardItemSelector', data);
            $httpBackendNew.flush();
            expect(scope.master.selectedCreditcard).toBe(data);
            expect(scope.master.positiefTegoedHoofdCreditcard).toBe(false);
            expect(scope.master.negatiefTegoedHoofdCreditcard).toBe(false);
            expect(scope.master.mogelijkLosGetarifeerd).toBe(false);
        });

        afterEach(function () {
            $httpBackendNew.verifyNoOutstandingExpectation();
            $httpBackendNew.verifyNoOutstandingRequest();
        });
    });

    describe('pmanagecreditcards-opzeggen-step1-controller -> ', function () {

        beforeEach(function () {
            module('pManageCreditcardsWAApp', 'ngResource');
            inject(function ($rootScope, $httpBackend, $controller, propertyService) {

                rootScope = $rootScope;
                scope = $rootScope.$new();
                scope.masterStateLoading = function () {
                };
                scope.masterStateOk = function () {
                };
                scope.masterStateError = function () {
                };
                scope.master = {};
                scope.baseUrl = '/app/p-manage-creditcards';
                scope.imageUrl = 'css/images/';
                scope.properties = propertyService.properties('pManageCreditcardsWAApp');
                $httpBackendNew = $httpBackend;

                $httpBackendNew.whenGET('/app/p-manage-creditcards/retrieve/cards?').
                    respond(200, creditcardsAll, {'Content-type': 'application/json'});

                $httpBackendNew.whenPOST('/app/p-manage-creditcards/verify/cards').
                    respond(200, verificationNOK, {'Content-type': 'application/json'});

                $httpBackendNew.whenPOST('/app/p-manage-creditcards/determineclose/cards').
                    respond(200, determineClosePositiveBalance, {'Content-type': 'application/json'});

                $controller('pmanagecreditcards-opzeggen-step1-controller', {
                    $scope: scope
                });
                $httpBackendNew.flush();
            });
        });


        it('verify not authorised', function () {
            // ALL FALSE BECAUSE NO PRIMARY CARD
            expect(scope.master.selectedCreditcard).toBeUndefined();
            // execute event:
            var data = {cardIndex: 'test', prop1: '1.00', prop6: '2222.****.****.2222', type: 'PRIMARY'};
            scope.$broadcast('ing-rich-select-change-creditCardItemSelector', data);
            $httpBackendNew.flush();
            expect(scope.master.selectedCreditcard).toBe(data);
            expect(scope.master.positiefTegoedHoofdCreditcard).toBe(false);
            expect(scope.master.negatiefTegoedHoofdCreditcard).toBe(false);
            expect(scope.master.mogelijkLosGetarifeerd).toBe(false);
            expect(scope.problemReportCfg).toBeDefined();
            expect(scope.problemReportCfg.message).toBe(scope.properties.VerifyNotAllowed);
        });


        afterEach(function () {
            $httpBackendNew.verifyNoOutstandingExpectation();
            $httpBackendNew.verifyNoOutstandingRequest();
        });
    });


    describe('JUST 1 CARD -> ', function () {

        beforeEach(function () {
            module('pManageCreditcardsWAApp', 'ngResource');
            inject(function ($rootScope, $httpBackend, $controller, propertyService) {
                rootScope = $rootScope;
                scope = $rootScope.$new();
                scope.masterStateLoading = function () {
                };
                scope.masterStateOk = function () {
                };
                scope.masterStateError = function () {
                };

                $httpBackendNew = $httpBackend;
                scope.master = {};
                scope.baseUrl = '/app/p-manage-creditcards';
                scope.imageUrl = 'css/images/';
                scope.properties = propertyService.properties('pManageCreditcardsWAApp');

                $httpBackendNew.whenGET('/app/p-manage-creditcards/retrieve/cards?').
                    respond(200, creditcardsJustOne, {'Content-type': 'application/json'});

                $httpBackendNew.whenPOST('/app/p-manage-creditcards/verify/cards').
                    respond(200, verificationOK, {'Content-type': 'application/json'});

                $httpBackendNew.whenPOST('/app/p-manage-creditcards/determineclose/cards').
                    respond(200, determineCloseNegativeBalance, {'Content-type': 'application/json'});

                $controller('pmanagecreditcards-opzeggen-step1-controller', {
                    $scope: scope
                });
                $httpBackendNew.flush();
            });
        });

        it('Verify initial setup creditcards', function () {
            expect(scope.master.allCreditcardItems.length).toBe(1);
        });

        it('negatief tegoed', function () {
            // NEGATIEF TEGOED, BECAUSE OF determineCloseNegativeBalance and PRIMARY CARD
            expect(scope.master.negatiefTegoedHoofdCreditcard).toBe(true);
            expect(scope.master.positiefTegoedHoofdCreditcard).toBe(false);
            expect(scope.master.mogelijkLosGetarifeerd).toBe(false);
        });

    });

    describe('JUST 3 CARDS -> ', function () {

        beforeEach(function () {
            module('pManageCreditcardsWAApp', 'ngResource');
            inject(function ($rootScope, $httpBackend, $controller, propertyService) {
                rootScope = $rootScope;
                scope = $rootScope.$new();
                scope.masterStateLoading = function () {
                };
                scope.masterStateOk = function () {
                };
                scope.masterStateError = function () {
                };

                scope.master = {};
                scope.baseUrl = '/app/p-manage-creditcards';
                scope.imageUrl = 'css/images/';
                scope.properties = propertyService.properties('pManageCreditcardsWAApp');

                $httpBackendNew = $httpBackend;

                $httpBackendNew.whenGET('/app/p-manage-creditcards/retrieve/cards?').
                    respond(200, creditcardsThreeOneMain, {'Content-type': 'application/json'});

                $httpBackendNew.whenPOST('/app/p-manage-creditcards/verify/cards').
                    respond(200, verificationOK, {'Content-type': 'application/json'});

                $httpBackendNew.whenPOST('/app/p-manage-creditcards/determineclose/cards').
                    respond(200, determineClosePossiblyCharged, {'Content-type': 'application/json'});

                $controller('pmanagecreditcards-opzeggen-step1-controller', {
                    $scope: scope
                });

                $httpBackendNew.flush();

            });
        });

        it('Verify initial setup creditcards', function () {

            var data = {creditcardIndex: '1', prop1: '1.00', prop6: '1234.****.****.0002', type: 'PRIMARY'};
            scope.$broadcast('ing-rich-select-change-creditCardItemSelector', data);
            $httpBackendNew.flush();

            expect(scope.master.allCreditcardItems.length).toBe(3);
            expect(scope.master.selectedCreditcard).toBe(data);
            expect(scope.master.negatiefTegoedHoofdCreditcard).toBe(false);
            expect(scope.master.positiefTegoedHoofdCreditcard).toBe(true);
            expect(scope.master.mogelijkLosGetarifeerd).toBe(true);
        });

    });

    describe('LIST WITH 6 CARDS -> ', function () {

        beforeEach(function () {
            module('pManageCreditcardsWAApp', 'ngResource');
            inject(function ($rootScope, $httpBackend, $controller, propertyService) {
                rootScope = $rootScope;
                scope = $rootScope.$new();
                scope.masterStateLoading = function () {
                };
                scope.masterStateOk = function () {
                };
                scope.masterStateError = function () {
                };

                scope.master = {};
                scope.baseUrl = '/app/p-manage-creditcards';
                scope.imageUrl = 'css/images/';
                scope.properties = propertyService.properties('pManageCreditcardsWAApp');

                $httpBackendNew = $httpBackend;

                $httpBackendNew.whenGET('/app/p-manage-creditcards/retrieve/cards?').
                    respond(200, creditcardsAll, {'Content-type': 'application/json'});

                $httpBackendNew.whenPOST('/app/p-manage-creditcards/verify/cards').
                    respond(200, verificationOK, {'Content-type': 'application/json'});

                $httpBackendNew.whenPOST('/app/p-manage-creditcards/determineclose/cards').
                    respond(200, determineClosePossiblyCharged, {'Content-type': 'application/json'});

                $controller('pmanagecreditcards-opzeggen-step1-controller', {
                    $scope: scope
                });
                $httpBackendNew.flush();

            });
        });

        it('Verify initial setup creditcards', function () {
            expect(scope.master.allCreditcardItems.length).toBe(7);
        });

        it('should return one extra card', function () {
            expect(scope.master.extraCreditcardItems).toBeUndefined();
            // execute event:
            var data = {creditcardIndex: 3, prop6: '1111.****.****.1111'};
            scope.$broadcast('ing-rich-select-change-creditCardItemSelector', data);
            $httpBackendNew.flush();
            expect(scope.master.extraCreditcardItems.length).toBe(1);

        });
    });

    describe('CREDITCARD SERVICE GEEFT GEEN CARDS TERUG -> ', function () {

        beforeEach(function () {
            module('pManageCreditcardsWAApp', 'ngResource');
            inject(function ($rootScope, $httpBackend, $controller, propertyService) {
                rootScope = $rootScope;
                scope = $rootScope.$new();
                scope.masterStateLoading = function () {
                };
                scope.masterStateOk = function () {
                };
                scope.masterStateError = function () {
                };

                scope.master = {};
                scope.baseUrl = '/app/p-manage-creditcards';
                scope.imageUrl = 'css/images/';
                scope.properties = propertyService.properties('pManageCreditcardsWAApp');
                $httpBackendNew = $httpBackend;

                $httpBackendNew.whenGET('/app/p-manage-creditcards/retrieve/cards?').
                    respond(200, creditcardsNone, {'Content-type': 'application/json'});

                $controller('pmanagecreditcards-opzeggen-step1-controller', {
                    $scope: scope
                });
                $httpBackendNew.flush();
            });
        });

        it('Gecal service error', function () {
            expect(scope.problemReportCfg).toBeDefined();
            expect(scope.problemReportCfg.message).toBe(scope.properties.NoCardsFound);
        });
    });


    describe('CREDITCARD SERVICE GEEFT ERROR TERUG -> ', function () {

        beforeEach(function () {
            module('pManageCreditcardsWAApp', 'ngResource');
            inject(function ($rootScope, $httpBackend, $controller, propertyService) {
                rootScope = $rootScope;
                scope = $rootScope.$new();
                scope.masterStateLoading = function () {
                };
                scope.masterStateOk = function () {
                };
                scope.masterStateError = function () {
                };

                scope.master = {};
                scope.baseUrl = '/app/p-manage-creditcards';
                scope.imageUrl = 'css/images/';

                scope.properties = propertyService.properties('pManageCreditcardsWAApp');
                $httpBackendNew = $httpBackend;

                $httpBackendNew.whenGET('/app/p-manage-creditcards/retrieve/cards?').
                    respond(200, gecalError, {'Content-type': 'application/json'});

                $controller('pmanagecreditcards-opzeggen-step1-controller', {
                    $scope: scope
                });
                $httpBackendNew.flush();
            });
        });

        it('Gecal service error', function () {
            expect(scope.problemReportCfg).toBeDefined();
            expect(scope.problemReportCfg.message).toBe('900: ' + scope.properties.GetCardsNotPossible);
        });
    });


    describe('JUST 1 CARD, VERIFY ERROR -> ', function () {

        beforeEach(function () {
            module('pManageCreditcardsWAApp', 'ngResource');
            inject(function ($rootScope, $httpBackend, $controller, propertyService) {
                rootScope = $rootScope;
                scope = $rootScope.$new();
                scope.masterStateLoading = function () {
                };
                scope.masterStateOk = function () {
                };
                scope.masterStateError = function () {
                };

                scope.master = {};
                scope.baseUrl = '/app/p-manage-creditcards';
                scope.imageUrl = 'css/images/';

                scope.properties = propertyService.properties('pManageCreditcardsWAApp');
                $httpBackendNew = $httpBackend;

                $httpBackendNew.whenGET('/app/p-manage-creditcards/retrieve/cards?').
                    respond(200, creditcardsJustOne, {'Content-type': 'application/json'});

                $httpBackendNew.whenPOST('/app/p-manage-creditcards/verify/cards').
                    respond(200, verificationError, {'Content-type': 'application/json'});


                $controller('pmanagecreditcards-opzeggen-step1-controller', {
                    $scope: scope
                });
                $httpBackendNew.flush();
            });
        });

        it('verify error', function () {
            expect(scope.problemReportCfg).toBeDefined();
            expect(scope.problemReportCfg.message).toBe('900: ' + scope.properties.VerifyNotPossible);
        });

    });

    describe('JUST 1 CARD, DETERMINE ERROR -> ', function () {

        beforeEach(function () {
            module('pManageCreditcardsWAApp', 'ngResource');
            inject(function ($rootScope, $httpBackend, $controller, propertyService) {
                rootScope = $rootScope;
                scope = $rootScope.$new();
                scope.masterStateLoading = function () {
                };
                scope.masterStateOk = function () {
                };
                scope.masterStateError = function () {
                };

                scope.master = {};
                scope.baseUrl = '/app/p-manage-creditcards';
                scope.imageUrl = 'css/images/';
                scope.properties = propertyService.properties('pManageCreditcardsWAApp');
                $httpBackendNew = $httpBackend;

                $httpBackendNew.whenGET('/app/p-manage-creditcards/retrieve/cards?').
                    respond(200, creditcardsJustOne, {'Content-type': 'application/json'});

                $httpBackendNew.whenPOST('/app/p-manage-creditcards/verify/cards').
                    respond(200, verificationOK, {'Content-type': 'application/json'});

                $httpBackendNew.whenPOST('/app/p-manage-creditcards/determineclose/cards').
                    respond(200, determineCloseError, {'Content-type': 'application/json'});

                $controller('pmanagecreditcards-opzeggen-step1-controller', {
                    $scope: scope
                });
                $httpBackendNew.flush();
            });
        });

        it('verify error', function () {
            expect(scope.problemReportCfg).toBeDefined();
            expect(scope.problemReportCfg.message).toBe('900: ' + scope.properties.DetermineNotPossible);
        });

    });


    describe('TESTING infoBrokerService -> ', function () {

        var ibs, bm;

        beforeEach(function () {
            module('pManageCreditcardsWAApp', 'ngResource');
            inject(function ($rootScope, $httpBackend, $controller, propertyService, infoBrokerService, CreditcardBusinessMonitoring) {
                rootScope = $rootScope;
                scope = $rootScope.$new();
                scope.masterStateLoading = function () {
                };
                scope.masterStateOk = function () {
                };
                scope.masterStateError = function () {
                };

                scope.master = {};
                scope.baseUrl = '/app/p-manage-creditcards';
                scope.imageUrl = 'css/images/';
                scope.properties = propertyService.properties('pManageCreditcardsWAApp');

                $httpBackendNew = $httpBackend;
                ibs = infoBrokerService;
                bm = CreditcardBusinessMonitoring;

                $httpBackendNew.whenGET('/app/p-manage-creditcards/retrieve/cards?').
                    respond(200, creditcardsAll, {'Content-type': 'application/json'});

                $controller('pmanagecreditcards-opzeggen-step1-controller', {
                    $scope: scope,
                    infoBrokerService: ibs,
                    CreditcardBusinessMonitoring: bm
                });
                $httpBackendNew.flush();
            });
        });

        it('should not go to next page', function () {

            ibs.info = {
                ingEmailInfo: {
                    emailAddress: 'a@b.nl'
                },
                ingServicePhoneInfo: {
                    phoneNumber: '010'
                }
            };
            scope.master.emailAddress = '';
            scope.master.selectedCreditcard =
            {
                prop1: -462.98,
                image: '/static/web/cms/angular-modules/spectingular/css/images/platinumcard.png',
                prop2: '?',
                prop3: 'EUR',
                prop6: '1234.****.****.9666',
                type: 'PRIMARY',
                prop4: 'Klaas Pietersen',
                name: 'PLATINUMCARD',
                title: 'Platinumcard',
                creditcardIndex: '1'
            };


            ibs.synchronize = function (fn) {
                fn.resolve('ok');
            };
            scope.$broadcast('handle-next-step-one');
            scope.$apply();
            expect(scope.master.emailAddress).toBe('a@b.nl');
        });

        it('should not go to next page because ibs service exception', function () {

            ibs.info = {
                ingEmailInfo: {
                    emailAddress: 'a@b.nl'
                },
                ingServicePhoneInfo: {
                    phoneNumber: '010'
                }
            };
            scope.master.emailAddress = '';

            ibs.synchronize = function (fn) {
                fn.reject('invalid');
            };
            scope.$broadcast('handle-next-step-one');
            scope.$apply();

            expect(scope.master.emailAddress).not.toBe('a@b.nl');

            ibs.synchronize = function (fn) {
                fn.reject('error');
            };
            scope.$broadcast('handle-next-step-one');
            scope.$apply();

            expect(scope.master.emailAddress).not.toBe('a@b.nl');

        });


    });
});