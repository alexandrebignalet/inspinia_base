(function () {
    'use strict';

    var addressDelete = {
        templateUrl: 'app/components/address/address-delete.html',
        controller: AddressDeleteController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('addressDelete', addressDelete);

    AddressDeleteController.$inject = ['Address'];

    /* @ngInject */
    function AddressDeleteController(Address) {
        var vm = this;

        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        vm.$onInit = function() {
            vm.addressId = vm.resolve.addressId;
        };

        function clear() {
            vm.modalInstance.dismiss();
        }

        function confirmDelete() {
            Address.delete(vm.addressId)
                .then(onSuccess)
                .catch(onError);

            function onSuccess() {
                vm.modalInstance.close();
            }

            function onError() {
                vm.modalInstance.dismiss();
            }
        }
    }


})();



