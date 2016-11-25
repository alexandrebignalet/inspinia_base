(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .filter('countryNameFilter', countryNameFilter);

    function countryNameFilter(COUNTRIES, $filter) {
        return countryNameFilter;

        ////////////////

        function countryNameFilter(item) {
            var country = $filter("filter")(COUNTRIES, {code: item},true);

            return country[0].name;
        }
    }

})();
