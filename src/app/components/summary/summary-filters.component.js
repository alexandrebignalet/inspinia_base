(function () {
    'use strict';

    var summaryFilters = {
        templateUrl: 'app/components/summary/summary-filters.html',
        controller: SummaryFiltersController,
        controllerAs: 'vm',
        bindings: {
            stats: '<',
            onChangeFilters: '&'
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

        vm.filtersValue = Immutable.fromJS();

        /*------------------------------------//

                     LIFECYCLE HOOKS

         //------------------------------------*/

        function onInit() {
            parseData();
        }

        function onChanges(){
            parseData();
        }

        function onChangeFilter() {

            vm.filters.countChange++;

            vm.filtersValue = Immutable.fromJS(vm.filters);

            vm.onChangeFilters({
                $event: {
                    filters: vm.filtersValue
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

            vm.filters = {
                selectedDatabases: vm.dataFilters.databases,
                selectedCompanies: vm.dataFilters.companies,
                selectedRouters:   vm.dataFilters.routers,
                selectedTypes:     vm.dataFilters.types
            };

            vm.filtersValue = Immutable.fromJS(vm.filters)

        }

        vm.dataFilters = {
            databases: [],
            companies: [],
            types:     [],
            routers:   []
        };

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

