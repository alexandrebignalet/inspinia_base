(function () {
    'use strict';

    var pricingPlanForm = {
        templateUrl: 'app/components/router-management/pricing-plan/pricing-plan-form.html',
        controller: PricingPlanFormController,
        controllerAs: 'vm',
        bindings: {
            pricingPlan: '<',
            routers: '<',
            pricingTiers: '<',
            onSavePricingPlan: '&',
            isSaving: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('pricingPlanForm', pricingPlanForm);

    PricingPlanFormController.$inject = [];

    /* @ngInject */
    function PricingPlanFormController() {
        var vm = this;
        vm.onSubmit = onSubmit;

        function onSubmit() {
            vm.onSavePricingPlan({
                $event: {
                    pricingPlan: vm.pricingPlan
                }
            });
        }
    }

})();
