module.exports = function (config) {
    config.set({

            // base path, that will be used to resolve files and exclude
            basePath: '../',

            // frameworks to use
            frameworks: ['jasmine'],

            // list of files / patterns to load in the browser
            files: [
                'app/lib/jquery/jquery.min.js',
                'app/lib/angular/angular.js',
                'app/lib/angular-resource/angular-resource.js',
                'app/lib/angular-sanitize/angular-sanitize.js',
                'app/lib/angular-route/angular-route.js',
                'app/lib/angular-mocks/angular-mocks.js',
                'app/lib/spectingular-core/js/global.js',
                'app/lib/spectingular-components/js/components.js',
                'app/lib/ui-bootstrap/*.js',
                'test/mocks/mockdata.js',
                'app/js/*.js',
                'app/js/**/*.js',
                'test/unit/**/*.js'
            ],

            plugins: [
                'karma-jasmine',
                'karma-junit-reporter',
                'karma-coverage',
                'karma-chrome-launcher',
                'karma-phantomjs-launcher'
            ],

            // test results reporter to use
            // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
            reporters: ['progress', 'coverage'],

            preprocessors: {
                'app/js/**/*.js': 'coverage'
            },

            coverageReporter: {
                reporters: [
                    {
                        type: 'html',
                        dir: 'reports/coverage'
                    },
                    {
                        type: 'text'
                    }
                ]
            },

            // the default configuration
            junitReporter: {
                outputFile: 'reports/junit/test-results.xml',
                suite: ''
            },

            // enable / disable colors in the output (reporters and logs)
            colors: true,

            // level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
            logLevel: config.LOG_INFO,

            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: true,

            // Start these browsers, currently available:
            // - Chrome
            // - ChromeCanary
            // - Firefox
            // - Opera
            // - Safari (only Mac)
            // - PhantomJS
            // - IE (only Windows)
            browsers: ['PhantomJS'],

            // If browser does not capture in given timeout [ms], kill it
            captureTimeout: 60000,

            // Continuous Integration mode
            // if true, it capture browsers, run tests and exit
            singleRun: false
        }
    );
};
