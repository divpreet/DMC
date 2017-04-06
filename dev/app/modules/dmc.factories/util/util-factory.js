(function() {
    'use strict';

    angular.module('cccwow.factories.util', []).factory('utilFactory', Util);
    Util.$inject = [];

    function Util() {

         Util.formatString = function() {
            var s = arguments[0];
            for (var i = 0; i < arguments.length; i++) {
                var reg = new RegExp("\\{" + i + "\\}", "gm");
                s = s.replace(reg, arguments[i + 1]);
            }
            return s;
        };
        
        return Util;
    }
})();