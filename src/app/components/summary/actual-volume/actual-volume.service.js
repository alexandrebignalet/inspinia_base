(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('ActualVolume', ActualVolume);

    ActualVolume.$inject = ['$http', 'API_BASE_URL'];

    /* @ngInject */
    function ActualVolume($http, API_BASE_URL) {

        var resourceUrl = API_BASE_URL + '/';
        var dateFormat = 'YYYY-MM-DD';

        /////////////////////////////////////////////

        var service = {
            getSummaryVolumes: getSummaryVolumes,
            getCommentByDate: getCommentByDate,
            saveComment: saveComment
        };

        return service;

        /////////////////////////////////////////////

        function getSummaryVolumes(startDate, endDate) {

            var startDateFormatted  = formatDateToQuery(startDate);
            var endDateFormatted    = formatDateToQuery(endDate);

            return $http({
                method: 'GET',
                url: resourceUrl + "summary/volumes/" + startDateFormatted + "/" + endDateFormatted
            });
        }

        function getCommentByDate(startDate, endDate, type) {

            var startDateFormatted  = formatDateToQuery(startDate);
            var endDateFormatted    = formatDateToQuery(endDate);

            return $http({
                method: 'GET',
                url: resourceUrl + "comment/" + type + "/" + startDateFormatted + "/" + endDateFormatted
            });
        }

        function saveComment(comment) {
            return $http({
                method: 'POST',
                url: resourceUrl + "comment/save",
                data: comment
            });
        }

        function formatDateToQuery(date) {
            return date.format(dateFormat);
        }

        function getFiltersContent(stats) {
            angular.forEach(stats, function(stat){
                addDatabaseToFilter(stat);
                addCompanyToFilter(stat);
                addCountryToFilter(stat);
                addTypeToFilter(stat);
            })
        }

    }

})();

