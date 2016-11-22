(function () {
    'use strict';

    var platformAccessDialog = {
        templateUrl: 'app/components/announcer/platform-access/platform-access-dialog.html',
        controller: PlatformAccessDialogController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('platformAccessDialog', platformAccessDialog);

    PlatformAccessDialogController.$inject = ['Announcer'];

    /* @ngInject */
    function PlatformAccessDialogController(Announcer) {
        var vm              = this;
        vm.clear            = clear;
        vm.save             = save;
        vm.selectAnnouncer  = '';

        vm.$onInit = function () {
            vm.announcers       = vm.resolve.announcers;
            vm.platformAccess   = vm.resolve.platformAccess;
            vm.selectAnnouncer  = vm.platformAccess.announcer == '';
        };

        function clear() {
            vm.modalInstance.dismiss();
        }


        function save() {
            vm.isSaving = true;

            if( vm.platformAccess.id != null ) {
                Announcer.updatePlatformAccess(vm.platformAccess);
            } else {
                Announcer.savePlatformAccess(vm.platformAccess);
            }

            vm.modalInstance.close('success');
        }
    }

})();
