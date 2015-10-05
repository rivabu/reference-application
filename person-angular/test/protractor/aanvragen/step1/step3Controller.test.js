/* https://github.com/angular/protractor */

describe('Aanvragen step 3', function () {
    'use strict';

    var aanvragenPage = new (require('../../pages/AanvragenPage'))(),
        step1 = aanvragenPage.step(1),
        step3;


    beforeEach(function () {
        aanvragenPage.setScenario('accounts', 'oneAccount');
        aanvragenPage.get();
        step1.chooseCreditCard(0);
        step1.nextButton.click().then(function () {
            aanvragenPage.step(2).nextButton.click()
                .then(function () {
                    step3 = aanvragenPage.step(3);
                });
        });
    });

    function expectAcceptedAlertVisible(expectedValue) {
        expect(step3.acceptedAlert.isDisplayed()).toBe(expectedValue);
    }

    describe('accepted alert', function () {

        it('should not display error in pristine state', function () {
            expectAcceptedAlertVisible(false);
            aanvragenPage.verifyActiveStep(3);
        });

        it('should not display error when terms of agreement gets checked', function(){
            step3.checkTermsOfAgreement();
            expectAcceptedAlertVisible(false);
        });

        it('should display error when terms of agreement gets checked and unchecked', function(){
            step3.checkTermsOfAgreement();
            step3.checkTermsOfAgreement();
            expectAcceptedAlertVisible(true);
        });

        it('should display error when next "Bevestigen" gets clicked', function(){
            step3.nextButton.click()
                .then(function(){
                    expectAcceptedAlertVisible(true);
                });
        });
    });

});