(function () {
    'use strict';

    var marginVolumeEcpm = {
        templateUrl: 'app/components/database/show/widgets/margin-volume-ecpm.html',
        controller: MarginVolumeEcpmController,
        controllerAs: 'vm',
        bindings: {

        }
    };

    angular
        .module('dataToolApp')
        .component('marginVolumeEcpm', marginVolumeEcpm);

    MarginVolumeEcpmController.$inject = [];

    /* @ngInject */
    function MarginVolumeEcpmController() {
        var vm = this;


    }

})();
