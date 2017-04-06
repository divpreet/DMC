

(function () {
    'use strict';

    angular.module('dmc.factories.logger', []).factory('Logger', loggers);
    loggers.$inject = ['$location', '$log', '$filter'];

    function loggers($location, $log, $filter) {
        var logger = {};
        var isDebuggingEnabled = true;
        var format = 'dd-MMM-yyyy h:mm:ss a';

        logger.log = function () {
            if (isDebuggingEnabled) {
                for (var i = 1; i < arguments.length; i++) {
                    $log.log("[" + $filter('date')(new Date(), format) + "] -- " + arguments[0] + " -- " + JSON.stringify(arguments[i]));
                }
            }
        };

        logger.debug = function () {
            if (isDebuggingEnabled) {
                for (var i = 1; i < arguments.length; i++) {
                    $log.debug("[" + $filter('date')(new Date(), format) + "] -- " + arguments[0] + " -- " + JSON.stringify(arguments[i]));
                }
            }
        };

        logger.info = function () {
            if (isDebuggingEnabled) {
                for (var i = 1; i < arguments.length; i++) {
                    $log.info("[" + $filter('date')(new Date(), format) + "] -- " + arguments[0] + " -- " + JSON.stringify(arguments[i]));
                }
            }
        };

        logger.warn = function () {
            if (isDebuggingEnabled) {
                for (var i = 1; i < arguments.length; i++) {
                    $log.warn("[" + $filter('date')(new Date(), format) + "] -- " + arguments[0] + " -- " + JSON.stringify(arguments[i]));
                }
            }
        };

        logger.error = function () {
            if (isDebuggingEnabled) {
                for (var i = 1; i < arguments.length; i++) {
                    $log.error("[" + $filter('date')(new Date(), format) + "] -- " + arguments[0] + " -- " + JSON.stringify(arguments[i]));
                }
            }
        };

        return logger;
    }
})();
