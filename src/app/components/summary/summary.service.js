(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('Contact', Contact);

    Contact.$inject = ['$resource', '$q', 'ToastrService', 'API_BASE_URL'];

    /* @ngInject */
    function  Contact($resource, $q, ToastrService, API_BASE_URL) {

        var service = {
            getSummaryByRouter: getSummaryByRouter,
            getSummaryStats: getSummaryStats,
            getTranche:getTranche
        };

        var resourceUrl = API_BASE_URL + '/api/summary';


        return service;

        ////////////////

        function getSummaryByRouter() {

        }

        function getSummaryStats() {

        }

        function getTranche() {

        }

    }

})();

