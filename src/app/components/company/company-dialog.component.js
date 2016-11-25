(function () {
    'use strict';

    var companyDialog = {
        templateUrl: 'app/components/company/company-dialog.html',
        controller: CompanyDialogController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('companyDialog', companyDialog);

    CompanyDialogController.$inject = ['Company', 'Address', 'Contact', 'TYPE_BILLING', '$translate', 'ToastrService'];

    /* @ngInject */
    function CompanyDialogController(Company, Address, Contact, TYPE_BILLING, $translate, ToastrService) {
        var vm = this;

        vm.clear = clear;

        vm.hasBillingContact = false;

        vm.onSaveCompany = onSaveCompany;
        vm.onSaveContact = onSaveContact;
        vm.onSaveAddress = onSaveAddress;
        vm.onDeleteContact = onDeleteContact;

        vm.$onInit = function () {
            vm.contact = Contact.init();
            vm.company = vm.resolve.company;
            vm.databases   = vm.resolve.databases;
        };

        function clear() {
            vm.modalInstance.dismiss('cancel');
        }

        function onSaveCompany($event) {

            vm.isSaving = true;

            if( $event.company.id ) {
                Company.update($event.company)
                    .then(onSuccess)
                    .catch(onError);
            } else {
                Company.save($event.company)
                    .then(onSuccess)
                    .catch(onError);
            }

            function onError() {
                vm.isSaving = false
            }

            function onSuccess(company) {
                vm.modalInstance.close(company);
                vm.isSaving = false
            }


        }

        function onSaveAddress($event) {
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
                delete address.$promise;
                delete address.$resolved;

                vm.isSaving = false;
                vm.company.address = address;
            }

            function onError() {
                vm.isSaving = false;
            }
        }

        function onSaveContact($event) {
            if (!$event.contact) return;

            var msg = $translate.instant('company.validation.billing');

            if ($event.contact.type === TYPE_BILLING && vm.hasBillingContact){
                ToastrService.error(msg, 'Validation');
                return;
            }
            if ($event.contact.type === TYPE_BILLING){
                vm.hasBillingContact = true;
            }

            vm.isSaving = true;

            if( $event.contact.id ) {
                Contact.update($event.contact)
                    .then(onSuccess)
                    .catch(onError);
            } else {
                Contact.save($event.contact)
                    .then(onSuccess)
                    .catch(onError);
            }

            function onError() {
                vm.isSaving = false;
            }

            function onSuccess(contact) {
                vm.isSaving = false;
                vm.company.contacts.push(contact);
                vm.contact = Contact.init();
            }
        }

        function onDeleteContact($event) {
            if (!$event.contact) return;

            vm.isSaving = true;

            Contact.delete($event.contact.id)
                .then(onSuccess)
                .catch(onError);

            function onSuccess() {
                vm.isSaving = false;

                vm.company.contacts.splice($event.index, 1);

                if($event.contact.type === TYPE_BILLING){
                    vm.hasBillingContact = false;
                }
            }

            function onError() {
                vm.isSaving = false;
            }
        }
    }

})();
