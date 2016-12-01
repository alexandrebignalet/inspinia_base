(function () {
    'use strict';

    var summaryFilters = {
        templateUrl: 'app/components/summary/summary-filters.html',
        controller: SummaryFiltersController,
        controllerAs: 'vm',
        bindings: {
            stats: '<',
            onChangeStats: '&'
        }
    };

    angular
        .module('dataToolApp')
        .component('summaryFilters', summaryFilters);

    SummaryFiltersController.$inject = ['$filter'];

    /* @ngInject */
    function SummaryFiltersController( $filter) {
        var vm = this;
        vm.$onInit = onInit;
        vm.$onChanges = onChanges;
        vm.onChangeFilter = onChangeFilter;


        /*------------------------------------//

                     LIFECYCLE HOOKS

         //------------------------------------*/

        function onInit() {
            parseData();
        }

        function onChanges(){
            parseData();
            onChangeFilter();
        }

        function onChangeFilter() {
            var filteredStats = updateFilteredStats();

            vm.onChangeStats({
                $event: {
                    filteredStats: filteredStats
                }
            })
        }

        /*------------------------------------//

                     FILTER SECTION

         //------------------------------------*/

        function parseData() {
            angular.forEach(vm.stats, function(stat) {
                composeFilterWithStat(stat);
            });

            vm.selectedDatabases = vm.dataFilters.databases;
            vm.selectedCompanies = vm.dataFilters.companies;
            vm.selectedRouters   = vm.dataFilters.routers;
            vm.selectedTypes     = vm.dataFilters.types;

            updateFilteredStats();
        }

        vm.dataFilters = {
            databases: [],
            companies: [],
            types: [],
            routers: []
        };

        function updateFilteredStats() {
            var filtered = $filter('propsOnArrayFilter')(vm.stats,'database_id',vm.selectedDatabases,'id');
            filtered     = $filter('propsOnArrayFilter')(filtered,'company_id',vm.selectedCompanies,'id');
            filtered     = $filter('propsOnArrayFilter')(filtered,'router_id',vm.selectedRouters,'id');
            filtered     = $filter('propsOnArrayFilter')(filtered,'database_type',vm.selectedTypes,'name');

            return filtered;
        }

        function composeFilterWithStat(stat) {
            addDatabaseToFilter(stat);
            addCompanyToFilter(stat);
            addRouterToFilter(stat);
            addTypeToFilter(stat);
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

