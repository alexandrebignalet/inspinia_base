(function () {
    'use strict';

    var pricingPlanDialog = {
        templateUrl: 'app/components/router/pricing-plan/pricing-plan-dialog.html',
        controller: PricingPlanDialogController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('pricingPlanDialog', pricingPlanDialog);

    PricingPlanDialogController.$inject = ['PricingPlan'];

    /* @ngInject */
    function PricingPlanDialogController(PricingPlan) {
        var vm = this;
        vm.clear = clear;
        vm.onSave = onSave;
        vm.isSaving = false;

        vm.$onInit = function () {
            vm.pricingPlan = vm.resolve.pricingPlan;
            vm.routers = vm.resolve.routers;
            vm.pricingTiers = vm.resolve.pricingTiers;
        };

        function clear() {
            vm.modalInstance.dismiss();
        }

        function onSave($event) {
            if (!$event.pricingPlan) return;

            vm.isSaving = true;

            if( $event.pricingPlan.id != null ) {
                PricingPlan.update($event.pricingPlan)
                    .then(onSuccess)
                    .catch(onError);
            } else {
                PricingPlan.save($event.pricingPlan)
                    .then(onSuccess)
                    .catch(onError);
            }

            function onSuccess(pricingPlan) {
                vm.isSaving = false;
                vm.modalInstance.close(pricingPlan);
            }

            function onError() {
                vm.isSaving = false;
            }
        }
    }

})();
