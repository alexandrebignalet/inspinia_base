(function () {
    'use strict';

    var avgVolume = {
        templateUrl: 'app/components/database/show/widgets/avg-volume.html',
        controller: AvgVolumeController,
        controllerAs: 'vm',
        bindings: {
            ladderTag: '<',
            ladderCampaign: '<',
            incomesByBm: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('avgVolume', avgVolume);

    AvgVolumeController.$inject = [];

    /* @ngInject */
    function AvgVolumeController() {
        var vm = this;
    }

})();
