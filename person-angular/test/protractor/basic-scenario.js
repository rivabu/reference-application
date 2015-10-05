'use strict';

/* https://github.com/angular/protractor */

describe('The "p Manage Creditcard" app is shown.', function () {

    beforeEach(function () {
        browser.get('index_e2e.html');
    });

    it('should show the first step of the wizard', function () {
        // element.all geeft het aantal elementen terug
        var elem = element.all(protractor.By.className('ing-wizard'));
        expect(elem.count()).toBe(1);

        var button = element.all(protractor.By.name('Volgende'));
        expect(button.count()).toBe(1);

        // findElement geeft het element zelf terug
        element(by.name('Volgende')).click().then(function () {
            element(by.name('Vorige')).click().then(function () {
            });
        });
    });

});
