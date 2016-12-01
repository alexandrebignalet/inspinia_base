(function () {
    'use strict';

    var summaryRouterShow = {
        templateUrl: 'app/components/summary/summary-router-show.html',
        controller: SummaryRouterShowController,
        controllerAs: 'vm',
        bindings: {
            router: '<',
            filtersData: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('summaryRouterShow', summaryRouterShow);

    SummaryRouterShowController.$inject = [];

    /* @ngInject */
    function SummaryRouterShowController() {
        var vm = this;

    }

})();

