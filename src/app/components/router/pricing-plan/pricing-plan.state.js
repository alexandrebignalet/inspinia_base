(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('router.pricing-plan-create', {
                parent: 'router',
                url: '/pricing-plan/create',
                data: {
                    pageTitle: 'Create a pricing plan',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                resolve: {
                    pricingTiers: ['PricingTier', function(PricingTier){
                        return PricingTier.getAll();
                    }],
                    routers: ['Router', function(Router){
                        return Router.getAll();
                    }]
                },
                onEnter: ['PricingPlanDialogService', 'PricingPlan', 'pricingTiers', 'routers',
                    function(PricingPlanDialogService, PricingPlan, pricingTiers, routers) {
                        var pricingPlan = PricingPlan.init();
                        PricingPlanDialogService.openDialogModal(pricingPlan, pricingTiers, routers);
                    }]
            })
            .state('router.pricing-plan-edit', {
                parent: 'router',
                url: '/pricing-plan/{id}/edit',
                data: {
                    pageTitle: 'Edit a pricing plan',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                resolve: {
                    pricingTiers: ['PricingTier', function(PricingTier){
                        return PricingTier.getAll();
                    }],
                    routers: ['Router', function(Router){
                        return Router.getAll();
                    }]
                },
                onEnter: ['$stateParams', 'PricingPlanDialogService', 'PricingPlan','pricingTiers', 'routers',
                    function($stateParams, PricingPlanDialogService, PricingPlan, pricingTiers, routers) {
                        var pricingPlan = PricingPlan.get(
                            $stateParams.id,
                            ['plans_all', 'routers_summary', 'tiers_summary']
                        );
                        PricingPlanDialogService.openDialogModal(pricingPlan, pricingTiers, routers);
                    }]
            })
            .state('router.pricing-plan-delete', {
                parent: 'router',
                url: '/pricing-plan/{id}/delete',
                data: {
                    pageTitle: 'Delete a pricing plan',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['$stateParams', 'PricingPlanDialogService',
                    function($stateParams, PricingPlanDialogService) {
                        PricingPlanDialogService.openDeleteModal($stateParams.id);
                    }]
            });
    }
})();
