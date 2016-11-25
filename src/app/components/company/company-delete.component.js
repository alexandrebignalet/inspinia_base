(function () {
    'use strict';

    var companyDelete = {
        templateUrl: 'app/components/company/company-delete.html',
        controller: CompanyDeleteController,
        controllerAs: 'vm',
        bindings: {
            companyId: '<',
            onDeleteCompany: '&',
            isDeleting: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('companyDelete', companyDelete);

    CompanyDeleteController.$inject = [];

    /* @ngInject */
    function CompanyDeleteController() {
        var vm = this;

        vm.onSubmit = onSubmit;

        function onSubmit() {
            vm.onDeleteCompany({
                $event: {
                    companyId: vm.companyId
                }
            })
        }
    }


})();



