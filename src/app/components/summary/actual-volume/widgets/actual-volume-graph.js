(function () {
    'use strict';

    var actualVolumeGraph = {
        templateUrl: 'app/components/summary/actual-volume/widgets/actual-volume-graph.html',
        controller: ActualVolumeGraphController,
        controllerAs: 'vm',
        bindings: {
        }
    };

    angular
        .module('dataToolApp')
        .component('actualVolumeGraph', actualVolumeGraph);

    ActualVolumeGraphController.$inject = [];

    /* @ngInject */
    function ActualVolumeGraphController() {
        var vm = this;

    }

})();

