(function () {
    'use strict';

    var summary = {
        templateUrl: 'app/components/summary/summary.html',
        controller: SummaryController,
        controllerAs: 'vm',
        bindings: {

        }
    };

    angular
        .module('dataToolApp')
        .component('summary', summary);

    SummaryController.$inject = ['SummaryStat','$filter'];

    /* @ngInject */
    function SummaryController(SummaryStat, $filter) {
        var vm = this;
        vm.summaryStats = [];
        vm.stats = [];
        vm.companies = [];
        vm.types = ['Internal', 'External'];


        vm.onChangeDates = onChangeDates;

        vm.$onInit = function(){

        };

        function onChangeDates($event) {

            var dates = $event.dates;
            var startDate = dates.startDate;
            var endDate = dates.endDate;

            SummaryStat.getSummaryStats(startDate, endDate)
                .then(onSuccess)
                .catch(onError);

            function onSuccess(response) {
                vm.stats = response.data;
                parseData();
            }

            function onError(error) {
                console.log(error);
            }
        }

        vm.dataFilters = {
            databases: [],
            companies: [],
            types: vm.types,
            routers: []
        };


        vm.onChangeFilter = function() {
            var filtered = $filter('propsOnArrayFilter')(vm.stats,'database_id',vm.selectedDatabases,'id');
            filtered = $filter('propsOnArrayFilter')(filtered,'company_id',vm.selectedCompanies,'id');
            vm.statsFiltered = filtered;
            console.log(vm.statsFiltered);
        };

        vm.routers = [];

        function parseData() {
            angular.forEach(vm.stats, function(stat) {
                composeFilterWithStat(stat);


            });
            console.log(vm.dataFilters);
            vm.selectedDatabases = vm.dataFilters.databases;
            vm.selectedCompanies = vm.dataFilters.companies;
        }


        /*------------------------------------//

                    FILTER SECTION

        //------------------------------------*/

        function composeFilterWithStat(stat) {
            addDatabaseToFilter(stat);
            addCompanyToFilter(stat);
            addRouterToFilter(stat);
        }

        function addDatabaseToFilter(stat) {

            if( indexOfArrayObject(stat.database_id, vm.dataFilters.databases, 'id') == -1){
                var database = {
                    id: stat.database_id,
                    name: stat.database_name
                };
                vm.dataFilters.databases.push(database);
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

        function addRouterToFilter(stat) {

            if( indexOfArrayObject(stat.router_id, vm.dataFilters.routers, 'id') == -1) {
                var router = {
                    id: stat.router_id,
                    name: stat.router_name
                };
                vm.dataFilters.routers.push(router);
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

