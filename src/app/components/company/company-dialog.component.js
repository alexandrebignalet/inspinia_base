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

    CompanyDialogController.$inject = ['Company'];

    /* @ngInject */
    function CompanyDialogController(Company) {
        var vm = this;
        vm.clear = clear;
        vm.onSave = onSave;

        vm.$onInit = function () {
            vm.company = vm.resolve.company;
            vm.databases   = vm.resolve.databases;
        };

        function clear() {
            vm.modalInstance.dismiss();
        }

        function onSave(company) {

            vm.isSaving = true;

            if( company.id ) {
                Company.update(company)
                    .then(success)
                    .catch(error);
            } else {
                Company.save(company)
                    .then(success)
                    .catch(error);
            }

            function error() {
                vm.isSaving = false
            }

            function success(company) {
                vm.modalInstance.close(company);
                vm.isSaving = false
            }


        }
    }

})();
