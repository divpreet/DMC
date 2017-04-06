/**
 * User Model to fetch the user details. It is used to check if the user has a particular role or not.<br>
 * It is also used to check the visibility of a button/link/tab depending upon the role of the user.
 */

(function () {
    'use strict';

    angular.module('dmc.filters.trusthtml').filter('dmcTrustHtml', TrustHtml);

    TrustHtml.$inject = ['$sce'];

    function TrustHtml($sce) {
        var filter = function (text) {
            return $sce.trustAsHtml(text);
        };

        return filter;
    }
})();
