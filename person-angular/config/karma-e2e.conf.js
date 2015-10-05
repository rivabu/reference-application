
module.exports = function (config) {
    config.set({
            basePath: '../',
            frameworks: ['ng-scenario'],
            files: [
                'test/e2e/**/*.js'
            ],
            plugins: [
                'karma-jasmine',
                'karma-junit-reporter',
                'karma-coverage',
                'karma-chrome-launcher',
                'karma-phantomjs-launcher',
                'karma-ng-scenario'
            ],

            // list of files to exclude
            exclude: [
            ],

            proxies: {
                '/': 'http://localhost:8000/'
            },

            // test results reporter to use
            // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
            reporters: ['progress'],


            colors: true,
            logLevel: config.LOG_INFO,
            autoWatch: true,
            browsers: ['Chrome'],
            captureTimeout: 60000,
            singleRun: true
        }
    );
};