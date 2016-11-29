(function () {
    'use strict';

    var pricingTierDeleteDialog = {
        templateUrl: 'app/components/router/pricing-tier/pricing-tier-dialog-delete.html',
        controller: PricingTierDeleteDialogController,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    };

    angular
        .module('dataToolApp')
        .component('pricingTierDeleteDialog', pricingTierDeleteDialog);

    PricingTierDeleteDialogController.$inject = ['PricingTier'];

    /* @ngInject */
    function PricingTierDeleteDialogController(PricingTier) {
        var vm = this;

        vm.isDeleting = false;

        vm.clear = clear;

        vm.onDelete = onDelete;

        vm.$onInit = function () {
            vm.pricingTierId = vm.resolve.pricingTierId;
        };

        function clear() {
            vm.modalInstance.dismiss('cancel');
        }

        function onDelete($event) {
            if (!$event.pricingTierId) return;

            vm.isDeleting = true;

            PricingTier.delete($event.pricingTierId)
                .then(onSuccess)
                .catch(onError);

            function onSuccess(pricingTier) {
                vm.isDeleting = false;
                vm.modalInstance.close(pricingTier);
            }

            function onError() {
                vm.isDeleting = false;
            }
        }
    }

})();
