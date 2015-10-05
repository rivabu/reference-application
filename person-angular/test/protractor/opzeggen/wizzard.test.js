describe('pManageCreditcardsWA opzeggen -> Wizard', function () {

    'use strict';

    var opzeggenPage = new (require('../pages/OpzeggenPage'))();

    beforeEach(function () {
        opzeggenPage.get();
    });

    it('Click through pages', function () {
        opzeggenPage.verifyActiveStep(1);
        opzeggenPage.navigateNextPage();
        opzeggenPage.verifyActiveStep(2);
        opzeggenPage.navigateAnnuleren();
        opzeggenPage.verifyActiveStep(1);
        opzeggenPage.navigateNextPage();
        opzeggenPage.navigateNextPage();
        opzeggenPage.verifyActiveStep(3);
    });

    it('Check page 1', function () {
        opzeggenPage.verifyActiveStep(1);
        expect(element.all(by.css('#creditCardItemSelector li')).count()).toBe(1);
        expect(opzeggenPage.getImportantToKnowStep1(1).getText()).toEqual('Nadat wij uw creditcard(s) beëindigd hebben, kunt u de af- en bijschrijvingen nog 12 maanden bekijken in Mijn ING.');
        expect(opzeggenPage.getImportantToKnowStep1(5).getText()).toEqual('Het positieve tegoed op uw creditcard wordt binnen 3 werkdagen bijgeschreven op uw Betaalrekening.');
        opzeggenPage.navigateNextPage();
        expect(opzeggenPage.getImportantToKnowStep2(5).getText()).toEqual('Het positieve tegoed op uw creditcard wordt binnen 3 werkdagen bijgeschreven op uw Betaalrekening.');
    });

});