(function () {
    'use strict';

    var contactDialog = {
        templateUrl: 'app/components/contact/contact-dialog.html',
        controller: ContactDialogController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('contactDialog', contactDialog);

    ContactDialogController.$inject = ['Contact'];

    /* @ngInject */
    function ContactDialogController(Contact) {
        var vm              = this;
        vm.clear            = clear;
        vm.saveEntity       = saveEntity;

        vm.$onInit = function () {
            vm.companies = vm.resolve.companies;
            vm.contact   = vm.resolve.contact;
        };

        function clear() {
            vm.modalInstance.dismiss();
        }

        function saveEntity(contact) {

            vm.isSaving = true;

            Contact.save(contact)
                .then(succes)
                .catch(error);

            function error() {

            }

            function success() {
                vm.modalInstance.close('success');
            }


        }
    }

})();
