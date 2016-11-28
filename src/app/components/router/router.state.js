(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('router', {
                parent: 'components',
                url: '/router',
                data: {
                    pageTitle: 'Router',
                    authorities: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_SUPER_ADMIN']
                },
                views: {
                    'content@': {
                        template: '<router routers="$resolve.routers" pricing-tiers="$resolve.pricingTiers"></router>'
                    }
                },
                resolve: {
                    routers: [
                        'Router', function(Router) {
                            return Router.getAll();
                    }],
                    pricingTiers: ['PricingTier', function(PricingTier){
                        return PricingTier.getAll();
                    }],
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('router');
                        $translatePartialLoader.addPart('pricing-tier');
                        return $translate.refresh();
                    }],
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['datatables']);
                    }
                }
            })
            .state('router.create', {
                parent: 'router',
                url: '/create',
                data: {
                    pageTitle: 'Create a router',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },

                onEnter: ['routerDialogService', 'Router',
                    function(routerDialogService,Router ) {
                        var router = Router.init();
                        routerDialogService.openDialogModal(router);
                    }]
            })
            .state('router.edit', {
                parent: 'router',
                url: '/edit/:routerId',
                data: {
                    pageTitle: 'Edit a router',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                resolve: {
                    router: [
                        'Router','$stateParams', function (Router,$stateParams) {
                            var routerId = $stateParams.routerId;
                            return Router.get(routerId,['routers_all'])
                        }
                    ]
                },
                onEnter: ['routerDialogService', 'router',
                    function(routerDialogService, router ) {
                        routerDialogService.openDialogModal(router);
                    }]
            })
        ;
    }
})();
