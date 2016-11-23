(function () {
    'use strict';

    var addressDialog = {
        templateUrl: 'app/components/address/address-dialog.html',
        controller: AddressDialogController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('addressDialog', addressDialog);

    AddressDialogController.$inject = ['Address'];

    /* @ngInject */
    function AddressDialogController(Address) {
        var vm = this;
        vm.clear = clear;
        vm.onSave = onSave;
        vm.isSaving = false;

        vm.$onInit = function () {
            vm.address = vm.resolve.address;
        };

        function clear() {
            vm.modalInstance.dismiss();
        }

        function onSave($event) {
            if (!$event.address) return;

            vm.isSaving = true;

            if( $event.address.id != null ) {
                Address.update($event.address)
                    .then(onSuccess)
                    .catch(onError);
            } else {
                Address.save($event.address)
                    .then(onSuccess)
                    .catch(onError);
            }

            function onSuccess(address) {
                vm.isSaving = false;
                vm.modalInstance.close(address);
            }

            function onError() {
                vm.isSaving = false;
            }


        }
    }

})();
