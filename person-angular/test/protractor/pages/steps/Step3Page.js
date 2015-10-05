module.exports = (function () {
    'use strict';

    var termsOfAgreementCheckbox = element(by.id('checkTerms'));

    var Step3Page = function () {
        this.checkTermsOfAgreement = function(){
            termsOfAgreementCheckbox.click();
        };
        this.acceptedAlert = element(by.className('js-accepted-alert'));
    };

    Step3Page.prototype = new (require('./StepPage'))(2);
    return Step3Page;
})();

