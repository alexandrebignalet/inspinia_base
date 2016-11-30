(function () {
    'use strict';

    var pricingTierDelete = {
        templateUrl: 'app/components/router-management/pricing-tier/pricing-tier-delete.html',
        controller: PricingTierDeleteController,
        controllerAs: 'vm',
        bindings: {
            pricingTierId: '<',
            onDeletePricingTier: '&',
            isDeleting: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('pricingTierDelete', pricingTierDelete);

    PricingTierDeleteController.$inject = [];

    /* @ngInject */
    function PricingTierDeleteController() {
        var vm = this;

        vm.onSubmit = onSubmit;

        function onSubmit() {
            vm.onDeletePricingTier({
                $event: {
                    pricingTierId: vm.pricingTierId
                }
            })
        }
    }


})();



