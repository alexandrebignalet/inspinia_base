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
        var vm = this;

        vm.clear = clear;
        vm.onSave = onSave;

        vm.$onInit = function () {
            vm.companies = vm.resolve.companies;
            vm.contact   = vm.resolve.contact;
        };

        function clear() {
            vm.modalInstance.dismiss();
        }

        function onSave($event) {

            vm.isSaving = true;

            if( $event.contact.id ) {
                Contact.update($event.contact)
                    .then(success)
                    .catch(error);
            } else {
                Contact.save($event.contact)
                    .then(onSuccess)
                    .catch(onError);
            }

            function onError() {
                vm.isSaving = false;
            }

            function onSuccess(entity) {
                vm.isSaving = false;
                vm.modalInstance.close(entity);
            }


        }
    }

})();
