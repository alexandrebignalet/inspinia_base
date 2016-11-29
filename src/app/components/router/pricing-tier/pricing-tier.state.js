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
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                views: {
                    'pricing-tier':{
                        template: '<pricing-tier pricing-tiers="$resolve.pricingTiers"></pricing-tier>'
                    }
                },
                resolve: {
                    pricingTiers: ['PricingTier', function(PricingTier){
                        return PricingTier.getAll();
                    }],
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('pricing-tier');
                        return $translate.refresh();
                    }],
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['datatables']);
                    }
                }
            })
            .state('pricing-tier.create', {
                parent: 'pricing-tier',
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
            .state('pricing-tier.edit', {
                parent: 'pricing-tier',
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
            })
            .state('pricing-tier-delete', {
                parent: 'pricing-tier',
                url: '/pricing-tier/{id}/delete',
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
