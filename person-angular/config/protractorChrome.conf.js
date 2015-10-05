var ScreenShotReporter = require('protractor-screenshot-reporter');
exports.config = {
    // The address of a running selenium server.
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    seleniumServerJar: '../test/lib/selenium/selenium-server-standalone-2.35.0.jar',
    chromeDriver: '../test/lib/selenium/chromedriver.exe',
    seleniumPort: 4444,


    onPrepare: function() {
        // Add a screenshot reporter and store screenshots to `/tmp/screnshots`:
//        jasmine.getEnv().addReporter(new ScreenShotReporter({
//            baseDirectory: 'c:/temp/screenshots'
//        }));


            // The require statement must be down here, since jasmine-reporters
            // needs jasmine to be in the global and protractor does not guarantee
            // this until inside the onPrepare function.
            require('jasmine-reporters');
            jasmine.getEnv().addReporter(
                new jasmine.JUnitXmlReporter('results/protractor/', true, true));


    },
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
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