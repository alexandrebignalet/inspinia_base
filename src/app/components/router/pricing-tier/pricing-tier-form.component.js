(function () {
    'use strict';

    var pricingTierForm = {
        templateUrl: 'app/components/router/pricing-tier/pricing-tier-form.html',
        controller: PricingTierFormController,
        controllerAs: 'vm',
        bindings: {
            pricingTier: '<',
            onSavePricingTier: '&',
            isSaving: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('pricingTierForm', pricingTierForm);

    PricingTierFormController.$inject = [];

    /* @ngInject */
    function PricingTierFormController() {
        var vm = this;
        vm.onSubmit = onSubmit;

        function onSubmit() {
            vm.onSavePricingTier({
                $event: {
                    pricingTier: vm.pricingTier
                }
            });
        }
    }

})();
