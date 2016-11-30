(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('PricingTierDialogService', PricingTierDialogService);

    PricingTierDialogService.$inject = ['$state', '$uibModal'];

    /* @ngInject */
    function PricingTierDialogService($state, $uibModal) {

        var service = {
            openDialogModal: openDialogModal,
            openDeleteModal: openDeleteModal
        };

        return service;

        ////////////////

        function openDialogModal(pricingTier) {

            $uibModal.open({
                component: 'pricingTierDialog',
                backdrop: 'true',
                size: 'lg',
                resolve: {
                    pricingTier: function(){
                        return pricingTier;
                    },
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['iCheckButtons']);
                    }
                }
            })
                .result
                .then(function () {
                        $state.go('^', null, {reload: true})
                    }, function () {
                        $state.go('^')
                    }
                );
        }

        function openDeleteModal(pricingTierId) {

            $uibModal.open({
                component: 'pricingTierDeleteDialog',
                backdrop: 'true',
                size: 'md',
                resolve: {
                    pricingTierId: function () {
                        return pricingTierId;
                    }
                }
            })
                .result
                .then(function(){
                    $state.go('^',null, {reload: true})
                },function() {
                    $state.go('^')
                })

        }
    }

})();

