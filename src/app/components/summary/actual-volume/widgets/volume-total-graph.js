(function () {
    'use strict';

    var volumeTotalGraph = {
        templateUrl: 'app/components/summary/actual-volume/widgets/volume-total-graph.html',
        controller: VolumeTotalGraphController,
        controllerAs: 'vm',
        bindings: {
            chartVolumeObject: '<',
            chartTotalsObject: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('volumeTotalGraph', volumeTotalGraph);

    VolumeTotalGraphController.$inject = [];

    /* @ngInject */
    function VolumeTotalGraphController() {
        var vm = this;
        vm.toogle = true;
    }

})();
