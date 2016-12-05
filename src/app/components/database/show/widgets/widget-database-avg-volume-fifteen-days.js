(function () {
    'use strict';

    var avgVolumeFifteenDays = {
        templateUrl: 'app/components/database/show/widgets/widget-database-avg-volume-fifteen-days.html',
        controller: AvgVolumeFifteenDaysController,
        controllerAs: 'vm',
        bindings: {

        }
    };

    angular
        .module('dataToolApp')
        .component('avgVolumeFifteenDays ', avgVolumeFifteenDays );

    AvgVolumeFifteenDaysController.$inject = [];

    /* @ngInject */
    function AvgVolumeFifteenDaysController() {
        var vm = this;
    }
})();
