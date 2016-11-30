(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('pricing-plan', {
                parent: 'router-main',
                url: '/pricing-plan',
                data: {
                    pageTitle: 'Pricing plan',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'],
                    activeTab: 2
                },
                views: {
                    'pricing-plan':{
                        template: '<pricing-plan pricing-plans="$resolve.pricingPlans"></pricing-plan>'
                    }
                },
                resolve: {
                    pricingPlans: ['PricingPlan', function(PricingPlan){
                        return PricingPlan.getAll(['plans_all', 'tiers_summary', 'routers_summary']);
                    }]
                }
            })
            .state('pricing-plan.create', {
                parent: 'pricing-plan',
                url: '/create',
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
            .state('pricing-plan.edit', {
                parent: 'pricing-plan',
                url: '/{id}/edit',
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
            .state('pricing-plan.delete', {
                parent: 'pricing-plan',
                url: '/{id}/delete',
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
