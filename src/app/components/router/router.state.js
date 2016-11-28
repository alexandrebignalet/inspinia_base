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
                        template: '<router routers="$resolve.routers"></router>'
                    }
                },
                resolve: {
                    routers: [
                        'Router', function(Router) {
                            return Router.getAll(['routers_all']);
                        }
                    ],
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
        ;
    }
})();
