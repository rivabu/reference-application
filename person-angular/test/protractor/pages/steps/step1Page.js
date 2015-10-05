module.exports = (function () {
    'use strict';

    var Step1Page = function () {
        this.creditCardSelector = element(by.id('creditCardItemSelector'));
        this.chooseCreditCard = function(index){
            element(by.id('creditCardItemSelector-' + index)).click();
        };
    };

    Step1Page.prototype = new (require('./StepPage'))(0);
    return Step1Page;
})();

