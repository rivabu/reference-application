module.exports = (function () {
    'use strict';
    var Step2Page = function () {

    };
    Step2Page.prototype = new (require('./StepPage'))(1);
    return Step2Page;
})();

