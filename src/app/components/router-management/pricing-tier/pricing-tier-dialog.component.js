(function () {
    'use strict';

    var pricingTierDialog = {
        templateUrl: 'app/components/router-management/pricing-tier/pricing-tier-dialog.html',
        controller: PricingTierDialogController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('pricingTierDialog', pricingTierDialog);

    PricingTierDialogController.$inject = ['PricingTier'];

    /* @ngInject */
    function PricingTierDialogController(PricingTier) {
        var vm = this;
        vm.clear = clear;
        vm.onSave = onSave;
        vm.isSaving = false;

        vm.$onInit = function () {
            vm.pricingTier = vm.resolve.pricingTier;
        };

        function clear() {
            vm.modalInstance.dismiss();
        }

        function onSave($event) {
            if (!$event.pricingTier) return;

            vm.isSaving = true;

            if( $event.pricingTier.id != null ) {
                PricingTier.update($event.pricingTier)
                    .then(onSuccess)
                    .catch(onError);
            } else {
                PricingTier.save($event.pricingTier)
                    .then(onSuccess)
                    .catch(onError);
            }

            function onSuccess(pricingTier) {
                vm.isSaving = false;
                vm.modalInstance.close(pricingTier);
            }

            function onError() {
                vm.isSaving = false;
            }
        }
    }

})();
