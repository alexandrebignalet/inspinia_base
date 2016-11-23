(function () {
    'use strict';

    var platformAccessDialog = {
        templateUrl: 'app/components/platform-access/platform-access-dialog.html',
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

    PlatformAccessDialogController.$inject = ['PlatformAccess'];

    /* @ngInject */
    function PlatformAccessDialogController(PlatformAccess) {
        var vm = this;
        vm.clear = clear;
        vm.onSave = onSave;
        vm.isSaving = false;

        vm.$onInit = function () {
            vm.announcers       = vm.resolve.announcers;
            vm.platformAccess   = vm.resolve.platformAccess;
        };

        function clear() {
            vm.modalInstance.dismiss();
        }

        function onSave($event) {
            if (!$event.platformAccess) return;

            vm.isSaving = true;

            if( $event.platformAccess.id != null ) {
                PlatformAccess.update($event.platformAccess)
                    .then(onSuccess)
                    .catch(onError);
            } else {
                PlatformAccess.save($event.platformAccess)
                    .then(onSuccess)
                    .catch(onError);
            }

            function onSuccess(platformAccess) {
                vm.isSaving = false;
                vm.modalInstance.close(platformAccess);
            }

            function onError() {
                vm.isSaving = false;
            }


        }
    }

})();
