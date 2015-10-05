'use strict';

describe('Testcase pManageCreditcardsWAApp -> Services -> ', function () {

    var mockHttp = {};
    var baseUrl = '/app/p-manage-creditcards';

    // global beforeEach
    beforeEach(module('pManageCreditcardsWAApp', 'ngResource'));
    beforeEach(inject(function ($rootScope, $httpBackend) {
        mockHttp = $httpBackend;
    }));

    
    afterEach(function () {
        mockHttp.verifyNoOutstandingExpectation();
        mockHttp.verifyNoOutstandingRequest();
    });


    describe('CreditcardService service -> ', function () {
        it('creditcardsAll', inject(function (CreditcardService) {
            mockHttp.whenGET('/app/p-manage-creditcards/retrieve/cards?').respond(
                    creditcardsAll,  {'Content-type': 'application/json'});

            var content = CreditcardService.get();
            mockHttp.flush();
            expect(content).toBeDefined();
        }));
        it('gecalError', inject(function (CreditcardService) {
            mockHttp.whenGET('/app/p-manage-creditcards/retrieve/cards?').respond(
                gecalError,  {'Content-type': 'application/json'});

            var content = CreditcardService.get();
            mockHttp.flush();
            expect(content).toBeDefined();
        }));
    });

    describe('VerifyService service -> ', function () {
        it('OK', inject(function (VerifyService) {
            mockHttp.whenPOST('/app/p-manage-creditcards/verify/cards').respond(200,
                verificationOK,  {'Content-type': 'application/json'});

            var content = VerifyService.post(baseUrl, '1111.****.****.1111');
            mockHttp.flush();
            expect(content).toBeDefined();
        }));
        it('Error', inject(function (VerifyService) {
            mockHttp.whenPOST('/app/p-manage-creditcards/verify/cards').respond(
                verificationError,  {'Content-type': 'application/json'});

            var content = VerifyService.post(baseUrl, '1111.****.****.1111');
            mockHttp.flush();
            expect(content).toBeDefined();
        }));
    });

    describe('DetermineCloseService service -> ', function () {
        it('Possibly charged', inject(function (DetermineCloseService) {
            mockHttp.whenPOST('/app/p-manage-creditcards/determineclose/cards').respond(
                determineClosePossiblyCharged,  {'Content-type': 'application/json'});

            var content = DetermineCloseService.post(baseUrl, '1111.****.****.1111');
            mockHttp.flush();
            expect(content).toBeDefined();
        }));
        it('Error', inject(function (DetermineCloseService) {
            mockHttp.whenPOST('/app/p-manage-creditcards/determineclose/cards').respond(
                determineCloseError,  {'Content-type': 'application/json'});

            var content = DetermineCloseService.post(baseUrl, '1111.****.****.1111');
            mockHttp.flush();
            expect(content).toBeDefined();
        }));
    });
});