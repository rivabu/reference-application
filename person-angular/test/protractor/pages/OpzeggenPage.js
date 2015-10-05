module.exports = function () {
    'use strict';

    this.get = function () {
        browser.get('/index_e2e.html');
    };

    this.verifyActiveStep = function (expectedStep) {

        element.all(by.repeater('step in config.steps')).then(function (steps) {
            steps.forEach(function (step, index) {
                step.getAttribute('class').then(function (classNames) {
                    classNames.split(' ').forEach(function (className) {
                        if (className === 'active') {
                            expect(index + 1).toBe(expectedStep);
                        }
                    });
                });

            });

        });
    };

    this.navigateNextPage = function () {
        element(by.css('a[name=Volgende]', 'Ga naar page II')).click();
    };
    this.navigateAnnuleren = function () {
        element(by.linkText('Annuleren', 'Ga naar page I')).click();
    };

    this.getImportantToKnowStep1 = function(listItemIndex){
        return element(by.css('#step-one ul.pmc-hyphen li:nth-child(' + listItemIndex + ')'));
    }         ;

    this.getImportantToKnowStep2 = function(listItemIndex){
        return element(by.css('#step-two ul li:nth-child(' + listItemIndex + ')'));
    };
};