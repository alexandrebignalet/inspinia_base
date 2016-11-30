(function () {
    'use strict';

    var pricingPlanDelete = {
        templateUrl: 'app/components/router-management/pricing-plan/pricing-plan-delete.html',
        controller: PricingPlanDeleteController,
        controllerAs: 'vm',
        bindings: {
            pricingPlanId: '<',
            onDeletePricingPlan: '&',
            isDeleting: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('pricingPlanDelete', pricingPlanDelete);

    PricingPlanDeleteController.$inject = [];

    /* @ngInject */
    function PricingPlanDeleteController() {
        var vm = this;

        vm.onSubmit = onSubmit;

        function onSubmit() {
            vm.onDeletePricingPlan({
                $event: {
                    pricingPlanId: vm.pricingPlanId
                }
            })
        }
    }


})();



