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
            console.log(changes);
            updateFilteredStats();
        };

        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('paging', false)
            .withDOM('t');

        function updateFilteredStats() {
            var filtered = $filter('propsOnArrayFilter')(vm.router.stats,'database_id',vm.filtersValue.selectedDatabases,'id');
            filtered     = $filter('propsOnArrayFilter')(filtered,'company_id',vm.filtersValue.selectedCompanies,'id');
            filtered     = $filter('propsOnArrayFilter')(filtered,'router_id',vm.filtersValue.selectedRouters,'id');
            filtered     = $filter('propsOnArrayFilter')(filtered,'database_type',vm.filtersValue.selectedTypes,'name');

            vm.filteredStats = filtered;
        }

    }

})();

