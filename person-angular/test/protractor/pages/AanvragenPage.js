module.exports = function () {
    'use strict';

    var steps = {
        '1': require('./steps/Step1Page'),
        '2': require('./steps/Step2Page'),
        '3': require('./steps/Step3Page')
    };

    var scenario = {};

    this.errorAlert = element(by.className('service-error-message'));

    this.setScenario = function (scenarioName, scenarioValue) {
        scenario[scenarioName] = scenarioValue || true;
    };

    this.get = function () {
        var url = 'aanvragen.html#?';
        for (var i in scenario) {
            if (scenario.hasOwnProperty(i)) {
                url += i + '=' + scenario[i] + '&';
            }
        }
        browser.get(url);
    };


    this.step = function (index) {
        return new (steps[index])();
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
};