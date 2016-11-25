(function () {
    'use strict';

    var companyForm = {
        templateUrl: 'app/components/company/company-form.html',
        controller: CompanyFormController,
        controllerAs: 'vm',
        bindings: {
            company: '<',
            databases: '<',
            isSaving: '<',
            onSaveCompany: '&',
            onDeleteContact: '&'
        }
    };

    angular
        .module('dataToolApp')
        .component('companyForm', companyForm);

    CompanyFormController.$inject = ['PAYMENT_PERIOD_OPTIONS', '$translate'];

    /* @ngInject */
    function CompanyFormController(PAYMENT_PERIOD_OPTIONS, $translate) {
        var vm = this;

        vm.onSubmit = onSubmit;
        vm.onSubmitDeleteContact = onSubmitDeleteContact;

        vm.$onInit = function(){
            vm.address = vm.company.address;
            vm.paymentPeriodOptions = PAYMENT_PERIOD_OPTIONS;
            vm.paymentPeriodOptions[0].name = $translate.instant('company.paymentPeriod.0');
        };

        function onSubmit() {
            vm.onSaveCompany({
                $event: {
                    company: vm.company
                }
            });
        }

        function onSubmitDeleteContact(contact, index) {

            vm.onDeleteContact({
                $event: {
                    contact: contact,
                    index: index
                }
            });
        }
    }

})();
