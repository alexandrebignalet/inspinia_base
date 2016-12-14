(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .filter('propsOnArrayFilterJs', propsOnArrayFilterJs);

    function propsOnArrayFilterJs() {
        return propsOnArrayFilterJsFilter;

        ////////////////

        function propsOnArrayFilterJsFilter(items, propItem, array, propArray) {
            var out = [];

            if (angular.isArray(items)) {

                items.forEach(function(item) {
                    var itemMatches = false;

                    itemMatches = indexOfArrayObject(item[propItem], array, propArray) != -1;

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        }
        function indexOfArrayObject(value,array,field) {
            for( var res = 0 ; res < array.length ; res++ ) {
                if (array[res][field] == value) { return res }
            }
            return -1;
        }

    }

})();

