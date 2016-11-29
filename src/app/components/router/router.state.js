(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('router', {
                parent: 'router-main',
                url: '/router',
                data: {
                    pageTitle: 'Router',
                    authorities: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_SUPER_ADMIN']
                },
                views: {
                    'router': {
                        template: '<router routers="$resolve.routers"></router>'
                    }
                },
                resolve: {
                    routers: ['Router', function(Router) {
                        return Router.getAll();
                    }],
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('router');
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
