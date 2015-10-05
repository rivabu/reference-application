var ScreenShotReporter = require('protractor-screenshot-reporter');
exports.config = {
    // The address of a running selenium server.
    //seleniumAddress: 'http://http://vls12214.europe.intranet:4444/wd/hub',
    seleniumServerJar: '../test/lib/selenium/selenium-server-standalone-2.35.0.jar',
        seleniumPort: 4445,


    onPrepare: function() {
        // Add a screenshot reporter and store screenshots to `/tmp/screnshots`:
//        jasmine.getEnv().addReporter(new ScreenShotReporter({
//            baseDirectory: 'c:/temp/screenshots'
//        }));
    },
// Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'firefox'
    },
    baseUrl: 'http://localhost:9000/app/',
    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['../test/protractor/**/*.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};