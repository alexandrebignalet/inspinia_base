(function () {
    'use strict';

    var companyForm = {
        templateUrl: 'app/components/company/company-form.html',
        controller: CompanyFormController,
        controllerAs: 'vm',
        bindings: {
            company: '<',
            databases: '<',
            onSaveCompany: '&'
        }
    };

    angular
        .module('dataToolApp')
        .component('companyForm', companyForm);

    CompanyFormController.$inject = ['Contact', 'Address'];

    /* @ngInject */
    function CompanyFormController(Contact, Address) {
        var vm = this;

        vm.isSaving = false;
        vm.contacts = [];
        vm.address = null;

        vm.onSubmit = onSubmit;
        vm.onSaveContact = onSaveContact;
        vm.onSaveAddress = onSaveAddress;

        vm.$onInit = function(){
            vm.newContact = Contact.initContact();
        };

        function onSubmit() {
            vm.onSaveCompany({
                $event: {
                    company: vm.company
                }
            });
        }

        function onSaveAddress($event){
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

        function onSaveContact(contact){
            vm.contacts.push(contact);
            vm.newContact = Contact.initContact();
        }
    }

})();
