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

        /*----------------------------------------------/

                      CONTROLLER LOGIC

        /----------------------------------------------*/
        /*----------------------------------------------/

         PROCESSING STATS SECTION FOR TAB

         IN : DATABASES SELECTED
         OUT : TOTALS (table),

         /----------------------------------------------*/

        function addStatToDatabase(value) {

            var index = indexOfArrayObject(value.database_id, vm.databases, 'id');

            if( index == -1){
                var databaseStat = {
                    summary_id: value.resume_id,
                    id: value.database_id,
                    company_id: value.company_id,
                    company_name: value.company_name,
                    database_type: value.database_type,
                    active: value.active,
                    planche_id: value.planche_id,
                    router_name: value.router_name,
                    database_name: value.database_name,
                    database_country: value.database_country,
                    total: +value.volume_sent,
                    date: value.date.date,
                    daybefore_volume: +value.volume_sent
                };

                var databaseFilter = {
                    id: value.database_id,
                    name: value.database_name
                };

                vm.dataFilters.databases.push(databaseFilter);
                vm.databases.push(databaseStat);

            } else {
                vm.dataFilters.databases[index].total += value.volume_sent;
                if( value.date.date >vm.dataFilters.databases[index].date ) {
                    vm.dataFilters.databases[index] = value.date.date;
                    vm.dataFilters.databases[index].daybefore_volume = value.volume_sent;
                }
            }

        }

        function addCompanyToFilter(stat) {

            if( indexOfArrayObject(stat.company_id, vm.dataFilters.companies, 'id') == -1) {
                var company = {
                    id: stat.company_id,
                    name: stat.company_name
                };
                vm.dataFilters.companies.push(company);
            }
        }

        function addCountryToFilter(stat) {

            if( indexOfArrayObject(stat.company_country, vm.dataFilters.countries, 'name') == -1) {
                var country = {
                    name: stat.company_country
                };
                vm.dataFilters.countries.push(country);
            }
        }

        function addTypeToFilter(stat) {
            if( indexOfArrayObject(stat.database_type, vm.dataFilters.types, 'name') == -1) {
                var type = {
                    name: stat.database_type
                };
                vm.dataFilters.types.push(type);
            }
        }

        function indexOfArrayObject(value,array,field) {
            for( var res = 0 ; res < array.length ; res++ ) {
                if (array[res][field] == value) { return res }
            }
            return -1;
        }

    }

})();

