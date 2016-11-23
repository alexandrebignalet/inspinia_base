(function () {
    'use strict';

    var platformAccess = {
        templateUrl: 'app/components/platform-access/platform-access.html',
        controller: PlatformAccessController,
        controllerAs: 'vm',
        bindings: {
            announcers : '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('platformAccess', platformAccess);

    PlatformAccessController.$inject = ['DTOptionsBuilder','DTColumnDefBuilder'];

    /* @ngInject */
    function PlatformAccessController(DTOptionsBuilder,DTColumnDefBuilder) {
        var vm = this;

        vm.dtOptions = DTOptionsBuilder.newOptions();

        vm.DTColumnDefs = [
            DTColumnDefBuilder.newColumnDef(1).notSortable(),
            DTColumnDefBuilder.newColumnDef(2).notSortable(),
            DTColumnDefBuilder.newColumnDef(3).notSortable(),
            DTColumnDefBuilder.newColumnDef(4).notSortable()
        ];
    }

})();



