(function () {
    'use strict';

    var actualVolumeFilters = {
        templateUrl: 'app/components/summary/actual-volume/actual-volume-filters.html',
        controller: ActualVolumeFiltersController,
        controllerAs: 'vm',
        bindings: {
            filtersContent: '<',
            onChangeFilters: '&'
        }
    };

    angular
        .module('dataToolApp')
        .component('actualVolumeFilters', actualVolumeFilters);

    ActualVolumeFiltersController.$inject = [];

    /* @ngInject */
    function ActualVolumeFiltersController() {
        var vm = this;

        vm.$onChanges = onChanges;
        vm.onChangeFilter = onChangeFilter;

        /*------------------------------------//

                    LIFECYCLE HOOKS

        //------------------------------------*/

        function onChanges(){
            initFilters();
        }

        function onChangeFilter() {

            vm.onChangeFilters({
                $event: {
                    filters: vm.filters
                }
            })
        }


        /*------------------------------------//

                    FILTER SECTION

         //------------------------------------*/

        function initFilters() {
            vm.filters = {
                selectedDatabases: vm.filtersContent.databases,
                selectedCompanies: vm.filtersContent.companies,
                selectedCountries: vm.filtersContent.countries,
                selectedTypes:     vm.filtersContent.types
            };
        }
    }

})();

