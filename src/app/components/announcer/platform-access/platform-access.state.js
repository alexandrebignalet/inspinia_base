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
                    pageTitle: 'Platform Access'
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
            .state('announcer.platform-access.create', {
                parent: 'announcer.platform-access',
                url: '/create/:announcerId',
                data: {
                    pageTitle: 'Create a Platform Access',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['platformAccessDialogService', '$stateParams',
                    function(platformAccessDialogService, $stateParams) {
                        var announcerId = $stateParams.announcerId;
                        platformAccessDialogService.openDialogModal(announcerId,'');
                    }]

            })
            .state('announcer.platform-access.edit', {
                parent: 'announcer.platform-access',
                url: '/edit/:platformAccessId',
                data: {
                    pageTitle: 'Edit a Platform Access',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['platformAccessDialogService', '$stateParams',
                    function(platformAccessDialogService, $stateParams) {
                        var platformAccessId = $stateParams.platformAccessId;
                        platformAccessDialogService.openDialogModal('',platformAccessId);
                    }]

            })
            .state('announcer.platform-access.delete', {
                parent: 'announcer.platform-access',
                url: '/delete/:platformAccessId',
                data: {
                    pageTitle: 'Delete a Platform Access',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['platformAccessDialogService', '$stateParams',
                    function(platformAccessDialogService, $stateParams) {
                        var platformAccessId = $stateParams.platformAccessId;
                        platformAccessDialogService.openDeleteModal(platformAccessId);
                    }]

            })
        ;
    }
})();
