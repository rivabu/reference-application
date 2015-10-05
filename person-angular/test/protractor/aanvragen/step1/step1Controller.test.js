/* https://github.com/angular/protractor */

describe('Aanvragen step 1', function () {
    'use strict';

    var aanvragenPage = new (require('../../pages/AanvragenPage'))(),
        step1 = aanvragenPage.step(1);

    function setAccountsScenario(scenarioValue) {
        aanvragenPage.setScenario('accounts', scenarioValue);
    }

    function expectNextPageInvisible() {
        expect(step1.nextButton.isDisplayed()).toBe(false);
    }

    describe('with a technical error', function () {

        beforeEach(function () {
            setAccountsScenario('technicalError');
            aanvragenPage.get();
        });

        it('should display a technical error', function () {
            expect(aanvragenPage.errorAlert.isDisplayed()).toBe(true);
            expect(aanvragenPage.errorAlert.getText()).toMatch(/.*Sorry, er is iets fout gegaan.*/);
        });
    });

    describe('with multiple accounts', function () {

        beforeEach(function () {
            setAccountsScenario('sevenAccounts');
            aanvragenPage.get();
        });

        it('should not show creditcard selector', function () {
            expect(step1.creditCardSelector.isDisplayed()).toBe(false);
        });

        it('should not show "Volgende" button', function () {
            expectNextPageInvisible(step1);
        });

    });

    describe('with single account', function () {

        beforeEach(function () {
            setAccountsScenario('oneAccount');
            aanvragenPage.get();
            browser.waitForAngular();
        });

        it('should show the creditcard selector', function () {
            expect(step1.creditCardSelector.isDisplayed()).toBe(true);

        });
    });

});