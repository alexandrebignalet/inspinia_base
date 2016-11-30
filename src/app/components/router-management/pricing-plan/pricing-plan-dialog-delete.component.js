(function () {
    'use strict';

    var pricingPlanDeleteDialog = {
        templateUrl: 'app/components/router-management/pricing-plan/pricing-plan-dialog-delete.html',
        controller: PricingPlanDeleteDialogController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('pricingPlanDeleteDialog', pricingPlanDeleteDialog);

    PricingPlanDeleteDialogController.$inject = ['PricingPlan'];

    /* @ngInject */
    function PricingPlanDeleteDialogController(PricingPlan) {
        var vm = this;

        vm.isDeleting = false;

        vm.clear = clear;

        vm.onDelete = onDelete;

        vm.$onInit = function () {
            vm.pricingPlanId = vm.resolve.pricingPlanId;
        };

        function clear() {
            vm.modalInstance.dismiss('cancel');
        }

        function onDelete($event) {
            if (!$event.pricingPlanId) return;

            vm.isDeleting = true;

            PricingPlan.delete($event.pricingPlanId)
                .then(onSuccess)
                .catch(onError);

            function onSuccess(pricingPlan) {
                vm.isDeleting = false;
                vm.modalInstance.close(pricingPlan);
            }

            function onError() {
                vm.isDeleting = false;
            }
        }
    }

})();
