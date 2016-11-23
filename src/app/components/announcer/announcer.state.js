(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('announcer', {
                parent: 'components',
                url: '/announcer',
                data: {
                    pageTitle: 'Announcer',
                    authorities: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_SUPER_ADMIN']
                },
                views: {
                    'content@': {
                        template: '<announcer announcers="$resolve.announcers"></announcer>'
                    }
                },
                resolve: {
                    announcers: [
                        'Announcer', function(Announcer) {
                            return Announcer.getAll();
                        }
                    ],
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('announcer');
                        return $translate.refresh();
                    }],
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['datatables']);
                    }
                }
            })
            .state('announcer.create', {
                parent: 'announcer',
                url: '/create',
                data: {
                    pageTitle: 'Create an announcer',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                resolve: {
                    contacts: [
                        'Contact', function (Contact) {
                            return Contact.getAll(['contacts_all'])
                        }
                    ],
                    companies: [
                        'Company', function (Company) {
                            return Company.getAll(['companies_all'])
                        }
                    ]
                },
                onEnter: ['announcerDialogService', 'Announcer', 'companies', 'contacts',
                    function(announcerDialogService, Announcer, companies, contacts) {
                        var announcer = Announcer.initAnnouncer();
                        announcerDialogService.openDialogModal(announcer,companies,contacts);
                    }]
            })
        ;
    }
})();
