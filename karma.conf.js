// Karma configuration
var browserify = require('browserify');

module.exports = function (config) {

    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        plugins: [
         //'karma-browserify',
         'karma-jasmine',
         'karma-coverage',
         'karma-phantomjs-launcher',
         'karma-chrome-launcher',
         'PhantomJS'
      ],

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'dev/app/build/WBC/css/*.css',
            'dev/libs/lodash.min.js',
            'node_modules/jquery/dist/jquery.js',
            'dev/libs/grunt-icons-loader.js',
            'dev/app/build/*.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'dev/app/modules/**/*.specs.js',

            'node_modules/karma-read-json/karma-read-json.js',
            'node_modules/**/jasmine-jquery.js',
            'node_modules/**/unit/*.js',
            {pattern: 'dev/app/modules/dmc.mocks/**/*.json',included: false}
        ],


        // list of files to exclude
        exclude: [
         //'app/**/yoda.*.js'
      ],

        /*browserify: {
            debug: true,
            transform: ['stringify', 'browserify-angular-injector', 'browserify-shim', 'browserify-istanbu']
        },*/

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'dev/app/modules/**/*.js': ['coverage']
            // 'app/dist/*.js': ['coverage']
        },

        // test results reporter to use9
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage', 'dots'], //, 'coverage', 'dots'

        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                { type: 'text-summary' },
                { type: 'lcov', subdir: './' }
            ]
        },

        // web server port
        port: 9000,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_ERROR,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'], //'Chrome', 'PhantomJS'

        /*browsers: ['Chrome', 'Chrome_without_security'],

        // you can define custom flags
        customLaunchers: {
            Chrome_without_security: {
                base: 'Chrome',
                flags: ['--disable-web-security']
            }
        },*/

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        browserNoActivityTimeout: 200000
    })
}
