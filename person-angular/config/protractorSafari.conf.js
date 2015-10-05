var ScreenShotReporter = require('protractor-screenshot-reporter');
exports.config = {
    // The address of a running selenium server.
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    seleniumServerJar: '../scripts/files/selenium-server-standalone-2.39.0.jar',
    seleniumPort: 4448,


    onPrepare: function() {
        // Add a screenshot reporter and store screenshots to `/tmp/screnshots`:
//        jasmine.getEnv().addReporter(new ScreenShotReporter({
//            baseDirectory: 'c:/temp/screenshots'
//        }));
    },
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'safari'
    },
    baseUrl: 'http://localhost:3000/app/',
    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['../test/protractor/**/*.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};