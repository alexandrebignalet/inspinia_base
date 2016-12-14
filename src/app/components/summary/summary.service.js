(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('SummaryStat', SummaryStat);

    SummaryStat.$inject = ['$resource', '$http', '$q', 'ToastrService', 'API_BASE_URL'];

    /* @ngInject */
    function  SummaryStat($resource, $http, $q, ToastrService, API_BASE_URL) {

        var resourceUrl = API_BASE_URL + '/';
        var dateFormat = 'YYYY-MM-DD';

        /////////////////////////////////////////////

        var service = {
            getSummaryStats: getSummaryStats,
            getTranches: getTranches
        };

        return service;

        /////////////////////////////////////////////

        function getSummaryStats(startDate,endDate) {

            var startDateFormatted  = formatDateToQuery(startDate);
            var endDateFormatted    = formatDateToQuery(endDate);

            return $http({
                method: 'GET',
                url: resourceUrl + 'summary/' + startDateFormatted + '/' + endDateFormatted
            });
        }

        function getTranches() {
            return $http({
                method: 'GET',
                url: resourceUrl + 'tranche/all'
            });
        }

        function formatDateToQuery(date) {
            return date.format(dateFormat);
        }
    }

})();

