(function () {
    'use strict';

    var addressForm = {
        templateUrl: 'app/components/address/address-form.html',
        controller: AddressFormController,
        controllerAs: 'vm',
        bindings: {
            address: '<',
            onSaveAddress: '&',
            isSaving: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('addressForm', addressForm);

    AddressFormController.$inject = ['COUNTRIES'];

    /* @ngInject */
    function AddressFormController(COUNTRIES) {
        var vm = this;
        vm.onSubmit = onSubmit;

        vm.$onInit = function (){
            vm.countries = COUNTRIES;
        };

        function onSubmit() {
            vm.onSaveAddress({
                $event: {
                    address: vm.address
                }
            });
        }
    }

})();
