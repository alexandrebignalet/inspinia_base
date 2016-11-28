(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('router.pricing-tier-create', {
                parent: 'router',
                url: '/pricing-tier/create',
                data: {
                    pageTitle: 'Create a pricing tier',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['PricingTierDialogService', 'PricingTier',
                    function(PricingTierDialogService, PricingTier) {
                        var pricingTier = PricingTier.init();
                        PricingTierDialogService.openDialogModal(pricingTier);
                    }]
            })
            .state('router.pricing-tier-edit', {
                parent: 'router',
                url: '/pricing-tier/{id}/edit',
                data: {
                    pageTitle: 'Edit a pricing tier',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['$stateParams', 'PricingTierDialogService', 'PricingTier',
                    function($stateParams, PricingTierDialogService, PricingTier) {
                        var pricingTier = PricingTier.get($stateParams.id);
                        PricingTierDialogService.openDialogModal(pricingTier);
                    }]
            });
    }
})();
