



module.exports = function(stepIndex) {
    'use strict';

    this.nextButton = element(by.className('step-' + stepIndex)).element(by.className('js-btn-next'));

};