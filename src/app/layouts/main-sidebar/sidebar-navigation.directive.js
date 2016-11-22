/**
 * Created by Axel on 18/11/2016.
 */

(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .directive('sideNavigation', sideNavigation);

    sideNavigation.$inject = ['$timeout'];

    /* @ngInject */
    function sideNavigation($timeout) {
        var directive = {
            restrict: 'A',
            link: function(scope, element) {
                // Call the metsiMenu plugin and plug it to sidebar navigation
                $timeout(function () {
                    element.metisMenu();
                });
            }
        };
        return directive;
    }
})();

