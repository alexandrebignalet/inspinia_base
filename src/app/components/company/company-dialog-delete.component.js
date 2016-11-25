(function () {
    'use strict';

    var companyDeleteDialog = {
        templateUrl: 'app/components/company/company-dialog-delete.html',
        controller: CompanyDeleteDialogController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('companyDeleteDialog', companyDeleteDialog);

    CompanyDeleteDialogController.$inject = ['Company'];

    /* @ngInject */
    function CompanyDeleteDialogController(Company) {
        var vm = this;

        vm.isDeleting = false;

        vm.clear = clear;

        vm.onDelete = onDelete;

        vm.$onInit = function () {
            vm.companyId = vm.resolve.companyId;
        };

        function clear() {
            vm.modalInstance.dismiss('cancel');
        }

        function onDelete($event) {
            if (!$event.companyId) return;

            vm.isDeleting = true;

            Company.delete($event.companyId)
                .then(onSuccess)
                .catch(onError);

            function onSuccess() {
                vm.isDeleting = false;
                vm.modalInstance.close();
            }

            function onError() {
                vm.isDeleting = false;
            }
        }
    }

})();
