(function () {
    'use strict';

    var summaryRouterShow = {
        templateUrl: 'app/components/summary/summary-router-show.html',
        controller: SummaryRouterShowController,
        controllerAs: 'vm',
        bindings: {
            router: '<',
            filtersValue: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('summaryRouterShow', summaryRouterShow);

    SummaryRouterShowController.$inject = ['$filter','DTOptionsBuilder'];

    /* @ngInject */
    function SummaryRouterShowController($filter,DTOptionsBuilder) {
        var vm = this;

        vm.$onChanges = function (changes) {
            updateFilteredStats();
        };



        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('paging', false)
            .withDOM('t');

        function updateFilteredStats() {

            var selectedDatabases = vm.filtersValue.get('selectedDatabases').toArray();
            var selectedCompanies = vm.filtersValue.get('selectedCompanies').toArray();
            var selectedTypes = vm.filtersValue.get('selectedTypes').toArray();
            var selectedRouters = vm.filtersValue.get('selectedRouters').toArray();

            var filtered = $filter('propsOnArrayFilter')(vm.router.stats,'database_id',selectedDatabases,'id');
            filtered     = $filter('propsOnArrayFilter')(filtered,'company_id',selectedCompanies,'id');
            filtered     = $filter('propsOnArrayFilter')(filtered,'router_id',selectedRouters,'id');
            filtered     = $filter('propsOnArrayFilter')(filtered,'database_type',selectedTypes,'name');

            vm.filteredStats = filtered;
        }

    }

})();

