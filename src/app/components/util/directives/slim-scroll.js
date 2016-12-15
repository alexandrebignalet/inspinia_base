(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .directive('slimScroll', slimScroll);

    slimScroll.$inject = [];

    /* @ngInject */
    function slimScroll() {

        return {
            restrict: 'A',
            scope: {
                boxHeight: '@'
            },
            link: function(scope, element) {
                $timeout(function(){
                    element.slimscroll({
                        height: scope.boxHeight,
                        railOpacity: 0.9
                    });
                });
            }
        };
    }
})();

