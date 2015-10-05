'use strict';

/* jasmine specs for the business monitoring service. */
describe('Given the business monitoring service', function () {

    var businessMonitoring;

    beforeEach(function () {
        module('pManageCreditcardsWAApp', function($provide){
            $provide.factory('businessMonitoring', function(){
                return {
                    fireEvent: function(){}
                };
            });
        });
        inject(function (_businessMonitoring_) {
            businessMonitoring = _businessMonitoring_;
        });
    });

    it('should fire a page One event', inject(function (CreditcardBusinessMonitoring) {
        spyOn(businessMonitoring, 'fireEvent');
        CreditcardBusinessMonitoring.firePageOneEvent();

        expect(businessMonitoring.fireEvent).toHaveBeenCalledWith({
            formStep : '1',
            formId : 'WS-Creditcard opzeggen',
            form : 'Wasstraat Creditcard opzeggen',
            events : 'event1'
        });
    }));

    it('should fire a page TWO event', inject(function (CreditcardBusinessMonitoring) {
        spyOn(businessMonitoring, 'fireEvent');
        var selectedCreditcard = {
            hasExtraCard : true,
            type: 'PRIMARY',
            name: 'CREDITCARD'
        };
        CreditcardBusinessMonitoring.firePageTwoEvent(selectedCreditcard);

        expect(businessMonitoring.fireEvent).toHaveBeenCalledWith({
            formStep : '2',
            formId : 'WS-Creditcard opzeggen',
            form : 'Wasstraat Creditcard opzeggen',
            formextra1 : 'Creditcard',
            formextra2 : 'Wel extra kaarten'
        });
    }));

    it('should fire an event STEP 2, SECONDARY, CREDITCARD', inject(function (CreditcardBusinessMonitoring) {
        spyOn(businessMonitoring, 'fireEvent');
        var selectedCreditcard = {
            hasExtraCard : true,
            type: 'SECONDARY',
            name: 'CREDITCARD'
        };
        CreditcardBusinessMonitoring.firePageTwoEvent(selectedCreditcard);

        expect(businessMonitoring.fireEvent).toHaveBeenCalledWith({
            formStep : '2',
            formId : 'WS-Creditcard opzeggen',
            form : 'Wasstraat Creditcard opzeggen',
            formextra1 : 'Creditcard',
            formextra2 : 'Alleen extra kaart'
        });
    }));

    it('should fire an event STEP 2, SECONDARY, PLATINUMCARD', inject(function (CreditcardBusinessMonitoring) {
        spyOn(businessMonitoring, 'fireEvent');
        var selectedCreditcard = {
            hasExtraCard : true,
            type: 'SECONDARY',
            name: 'PLATINUMCARD'
        };
        CreditcardBusinessMonitoring.firePageTwoEvent(selectedCreditcard);

        expect(businessMonitoring.fireEvent).toHaveBeenCalledWith({
            formStep : '2',
            formId : 'WS-Creditcard opzeggen',
            form : 'Wasstraat Creditcard opzeggen',
            formextra1 : 'Platinumcard',
            formextra2 : 'Alleen extra kaart'
        });
    }));

    it('should fire an event STEP 2, SECONDARY, PLATINUMCARD, geen extra kaarten', inject(function (CreditcardBusinessMonitoring) {
        spyOn(businessMonitoring, 'fireEvent');
        var selectedCreditcard = {
            hasExtraCard : false,
            type: 'PRIMARY',
            name: 'PLATINUMCARD'
        };
        CreditcardBusinessMonitoring.firePageTwoEvent(selectedCreditcard);

        expect(businessMonitoring.fireEvent).toHaveBeenCalledWith({
            formStep : '2',
            formId : 'WS-Creditcard opzeggen',
            form : 'Wasstraat Creditcard opzeggen',
            formextra1 : 'Platinumcard',
            formextra2 : 'Geen extra kaarten'
        });
    }));

    it('should fire an event STEP 3', inject(function (CreditcardBusinessMonitoring) {
        spyOn(businessMonitoring, 'fireEvent');
        var selectedCreditcard = {
            hasExtraCard : true,
            type: 'SECONDARY',
            name: 'PLATINUMCARD'
        };
        CreditcardBusinessMonitoring.firePageThreeEvent(selectedCreditcard);

        expect(businessMonitoring.fireEvent).toHaveBeenCalledWith({
            formStep : '3',
            formId : 'WS-Creditcard opzeggen',
            form : 'Wasstraat Creditcard opzeggen',
            formextra1 : 'Platinumcard',
            formextra2 : 'Alleen extra kaart',
            events : 'purchase'
        });
    }));

    it('should fire an event STEP 3', inject(function (CreditcardBusinessMonitoring) {
        spyOn(businessMonitoring, 'fireEvent');

        CreditcardBusinessMonitoring.fireErrorEvent('100');

        expect(businessMonitoring.fireEvent).toHaveBeenCalledWith({
            error : '100',
            errorType : 'Error'
        });
    }));

});