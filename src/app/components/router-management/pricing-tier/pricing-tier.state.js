(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('pricing-tier', {
                parent: 'router-main',
                url: '/pricing-tier',
                data: {
                    pageTitle: 'Pricing tier',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'],
                    activeTab: 2
                },
                views: {
                    'pricing-tier':{
                        template: '<pricing-tier pricing-tiers="$resolve.pricingTiers"' +
                                                'on-show-pricing-tier="vm.onSelect($event)"></pricing-tier>'
                    },
                    'show-entity': {
                        template: '<pricing-tier-show pricing-tier="vm.pricingTierSelected"></pricing-tier-show>'
                    }
                },
                resolve: {
                    pricingTiers: ['PricingTier', function(PricingTier){
                        return PricingTier.getAll();
                    }]
                }
            })
            .state('pricing-tier.create', {
                parent: 'pricing-tier',
                url: '/create',
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
            .state('pricing-tier.edit', {
                parent: 'pricing-tier',
                url: '/{id}/edit',
                data: {
                    pageTitle: 'Edit a pricing tier',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['$stateParams', 'PricingTierDialogService', 'PricingTier',
                    function($stateParams, PricingTierDialogService, PricingTier) {
                        var pricingTier = PricingTier.get($stateParams.id);
                        PricingTierDialogService.openDialogModal(pricingTier);
                    }]
            })
            .state('pricing-tier.delete', {
                parent: 'pricing-tier',
                url: '/{id}/delete',
                data: {
                    pageTitle: 'Delete a pricing tier',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['$stateParams', 'PricingTierDialogService',
                    function($stateParams, PricingTierDialogService) {
                        PricingTierDialogService.openDeleteModal($stateParams.id);
                    }]
            });
    }
})();
