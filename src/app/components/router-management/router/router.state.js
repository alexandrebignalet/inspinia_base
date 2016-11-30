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
                    authorities: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_SUPER_ADMIN'],
                    activeTab: 0
                },
                views: {
                    'router': {
                        template: '<router routers="$resolve.routers"' +
                                          'on-show-router="vm.onSelect($event)"></router>'
                    },
                    'show-entity': {
                        template: '<router-show router="vm.routerSelected"></router-show>'
                    }
                },
                resolve: {
                    routers: ['Router', function(Router) {
                        return Router.getAll();
                    }]
                }
            })
            .state('router.create', {
                parent: 'router',
                url: '/create',
                data: {
                    pageTitle: 'Create a router',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },

                onEnter: ['RouterDialogService', 'Router',
                    function(RouterDialogService, Router) {
                        var router = Router.init();
                        RouterDialogService.openDialogModal(router);
                    }]
            })
            .state('router.edit', {
                parent: 'router',
                url: '/{id}/edit',
                data: {
                    pageTitle: 'Edit a router',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                resolve: {
                    router: ['Router','$stateParams', function (Router,$stateParams) {
                            return Router.get($stateParams.id);
                    }]
                },
                onEnter: ['RouterDialogService', 'router',
                    function(RouterDialogService, router ) {
                        RouterDialogService.openDialogModal(router);
                    }]
            })
            .state('router.delete', {
                parent: 'router',
                url: '/{id}/delete',
                data: {
                    pageTitle: 'Delete a router',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['$stateParams', 'RouterDialogService',
                    function($stateParams, RouterDialogService) {
                        RouterDialogService.openDeleteModal($stateParams.id);
                    }]
            });
    }
})();
