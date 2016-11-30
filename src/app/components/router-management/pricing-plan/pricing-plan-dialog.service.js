(function () {
    'use strict';

    angular
        .module('dataToolApp')
        .factory('PricingPlanDialogService', PricingPlanDialogService);

    PricingPlanDialogService.$inject = ['$state', '$uibModal'];

    /* @ngInject */
    function PricingPlanDialogService($state, $uibModal) {

        var service = {
            openDialogModal: openDialogModal,
            openDeleteModal: openDeleteModal
        };

        return service;

        ////////////////

        function openDialogModal(pricingPlan, pricingTiers, routers) {

            $uibModal.open({
                component: 'pricingPlanDialog',
                backdrop: 'true',
                size: 'lg',
                resolve: {
                    pricingTiers: function(){
                        return pricingTiers;
                    },
                    routers: function(){
                        return routers;
                    },
                    pricingPlan: function(){
                        return pricingPlan;
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

        function openDeleteModal(pricingPlanId) {

            $uibModal.open({
                component: 'pricingPlanDeleteDialog',
                backdrop: 'true',
                size: 'md',
                resolve: {
                    pricingPlanId: function () {
                        return pricingPlanId;
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

