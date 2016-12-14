(function () {
    'use strict';

    var incomesMarginGraph = {
        templateUrl: 'app/components/database/show/widgets/incomes-margin-graph.html',
        controller: IncomesMarginGraphController,
        controllerAs: 'vm',
        bindings: {
            ladderTag: '<',
            ladderCampaign: '<',
            incomesByBm: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('incomesMarginGraph', incomesMarginGraph);

    IncomesMarginGraphController.$inject = ['Database'];

    /* @ngInject */
    function IncomesMarginGraphController() {
        var vm = this;
        vm.charte = {
            data: [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ],
            series: ['Series A', 'Series B'],
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            options: {}
        };
    }

})();
