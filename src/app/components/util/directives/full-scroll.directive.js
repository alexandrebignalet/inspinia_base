(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .directive('fullScroll', fullScroll);

    fullScroll.$inject = [];

    /* @ngInject */
    function fullScroll() {

        var directive = {
            link: link,
            restrict: 'A'
        };

        return directive;

        function link(scope, element) {
            
            console.log('full');
            scope.$evalAsync(
                function(){
                    element.slimscroll({
                        height: '100%',
                        railOpacity: 0.9
                    });
                }
            );
        }
    }
})();

