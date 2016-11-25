(function () {
    'use strict';

    var addressDelete = {
        templateUrl: 'app/components/address/address-delete.html',
        controller: AddressDeleteController,
        controllerAs: 'vm',
        bindings: {
            addressId: '<',
            onDeleteAddress: '&',
            isDeleting: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('addressDelete', addressDelete);

    AddressDeleteController.$inject = [];

    /* @ngInject */
    function AddressDeleteController() {
        var vm = this;

        vm.onSubmit = onSubmit;

        function onSubmit() {
            vm.onDeleteAddress({
                $event: {
                    addressId: vm.addressId
                }
            })
        }
    }


})();



