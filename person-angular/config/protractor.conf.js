// A reference configuration file.
exports.config = {
//  seleniumPort: null,
//  chromeDriver: '.node_modules/protractor/selenium/chromedriver.exe',
//  chromeOnly: false,
//  seleniumArgs: [],

    seleniumAddress: 'http://localhost:4444/wd/hub',
    allScriptsTimeout: 11000,
    specs: [
        '../test/protractor/**/*.js',
    ],
    exclude: [],

    capabilities: {
        'browserName': 'chrome'
    },

    multiCapabilities: [],

    baseUrl: 'http://127.0.0.1:8000/',
    rootElement: 'body',
    onPrepare: function () {},

    params: {
        baseUrl: 'http://127.0.0.1:8000/'
    },
    framework: 'jasmine',

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },

    onCleanUp: function () { }
};