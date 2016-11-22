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
        vm.saveEntity       = saveEntity;

        vm.$onInit = function () {
            vm.announcers       = vm.resolve.announcers;
            vm.platformAccess   = vm.resolve.platformAccess;
        };

        function clear() {
            vm.modalInstance.dismiss();
        }

        function saveEntity(platformAccess) {

            vm.isSaving = true;

            if( vm.platformAccess.id != null ) {
                Announcer.updatePlatformAccess(platformAccess);
            } else {
                Announcer.savePlatformAccess(platformAccess)
                    .then(success)
                    .catch(error)
                ;
            }

            function error() {

            }

            function success() {
                vm.modalInstance.close('success');
            }


        }
    }

})();
