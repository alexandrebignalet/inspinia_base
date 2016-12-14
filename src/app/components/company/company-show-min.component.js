(function () {
    'use strict';

    var companyShowMin = {
        templateUrl: 'app/components/company/company-show-min.html',
        controller: CompanyShowMinController,
        controllerAs: 'vm',
        bindings: {
            company : '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('companyShowMin', companyShowMin);

    CompanyShowMinController.$inject = ['Company'];

    function CompanyShowMinController(Company){
        var vm = this;

        vm.$onInit = onInit;

        function onInit(){
            vm.billingContact = Company.getBillingContact(vm.company);
        }
    }
})();



