(function () {
    'use strict';

    var actualVolume = {
        templateUrl: 'app/components/summary/actual-volume/actual-volume.html',
        controller: ActualVolumeController,
        controllerAs: 'vm',
        bindings: {
        }
    };

    angular
        .module('dataToolApp')
        .component('actualVolume', actualVolume);

    ActualVolumeController.$inject = [];

    /* @ngInject */
    function ActualVolumeController() {
        var vm = this;

    }

})();

