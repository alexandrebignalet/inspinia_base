/**
 * Created by Axel on 18/11/2016.
 */
/**
 * Created by Axel on 17/11/2016.
 */

/**
 * Created by Axel on 17/11/2016.
 */
(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('announcer.platform-access', {
                parent: 'announcer',
                url: '/platform-access',
                data: {
                    pageTitle: 'Platform Access',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                views: {
                    'content@': {
                        template: '<platform-access announcers="$resolve.data"></platform-access>'
                    }
                },
                resolve: {
                    data: [
                        'Announcer', function(Announcer) {
                            return Announcer.getAll(['announcers_all','platform_access_all']);
                        }
                    ],
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('announcer');
                        return $translate.refresh();
                    }],
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'datatables'
                        ]);
                    }
                }
            })
            .state('announcer.platform-access.createForAnnouncer', {
                parent: 'announcer.platform-access',
                url: '/create-for-announcer/:announcerId',
                data: {
                    pageTitle: 'Create a Platform Access',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                resolve: {
                    announcer: ['Announcer', '$stateParams', function(Announcer, $stateParams){
                        return Announcer.get($stateParams.announcerId);
                    }]
                },
                onEnter: ['PlatformAccessDialogService', 'PlatformAccess', 'announcer',
                    function(PlatformAccessDialogService, PlatformAccess, announcer) {
                        var platformAccess = PlatformAccess.init();
                        platformAccess.announcer = announcer;

                        PlatformAccessDialogService.openDialogModal(platformAccess);
                    }]
            })
            .state('announcer.platform-access.create', {
                parent: 'announcer.platform-access',
                url: '/create',
                data: {
                    pageTitle: 'Create a Platform Access',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                resolve:{
                    announcers: ['Announcer', function(Announcer){
                        return Announcer.getAll();
                    }]
                },
                onEnter: ['PlatformAccessDialogService', 'PlatformAccess', 'announcers',
                    function(PlatformAccessDialogService, PlatformAccess, announcers) {
                        PlatformAccessDialogService.openDialogModal(PlatformAccess.init(), announcers);
                    }]
            })
            .state('announcer.platform-access.edit', {
                parent: 'announcer.platform-access',
                url: '/edit/:id',
                data: {
                    pageTitle: 'Edit a Platform Access',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                resolve:{
                    platformAccess: ['PlatformAccess', '$stateParams', function(PlatformAccess, $stateParams){
                        return PlatformAccess.get($stateParams.id);
                    }]
                },
                onEnter: ['PlatformAccessDialogService', 'platformAccess',
                    function(PlatformAccessDialogService,platformAccess) {
                        PlatformAccessDialogService.openDialogModal(platformAccess);
                    }]

            })
            .state('announcer.platform-access.delete', {
                parent: 'announcer.platform-access',
                url: '/delete/:id',
                data: {
                    pageTitle: 'Delete a Platform Access',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['PlatformAccessDialogService', '$stateParams',
                    function(PlatformAccessDialogService, $stateParams) {
                        PlatformAccessDialogService.openDeleteModal($stateParams.id);
                    }]

            })
        ;
    }
})();
