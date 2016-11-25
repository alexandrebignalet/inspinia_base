(function () {
    'use strict';

    var addressDeleteDialog = {
        templateUrl: 'app/components/address/address-dialog-delete.html',
        controller: AddressDeleteDialogController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('addressDeleteDialog', addressDeleteDialog);

    AddressDeleteDialogController.$inject = ['Address'];

    /* @ngInject */
    function AddressDeleteDialogController(Address) {
        var vm = this;

        vm.isDeleting = false;

        vm.clear = clear;

        vm.onDelete = onDelete;

        vm.$onInit = function () {
            vm.addressId = vm.resolve.addressId;
        };

        function clear() {
            vm.modalInstance.dismiss('cancel');
        }

        function onDelete($event) {
            if (!$event.addressId) return;

            vm.isDeleting = true;

            Address.delete($event.addressId)
                .then(onSuccess)
                .catch(onError);

            function onSuccess(address) {
                vm.isDeleting = false;
                vm.modalInstance.close();
            }

            function onError() {
                vm.isDeleting = false;
            }
        }
    }

})();
