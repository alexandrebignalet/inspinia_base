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
                            return Announcer.getAll(['announcers_all','companies_summary','contacts_summary','addresses_summary']);
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
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('announcer');
                        $translatePartialLoader.addPart('company');
                        $translatePartialLoader.addPart('address');
                        return $translate.refresh();
                    }],
                    databases: [
                        'Database', function(Database) {
                            return Database.getAll(['databases_summary'])
                        }
                    ],
                    contacts: [
                        'Contact', function (Contact) {
                            return Contact.getAll(['contacts_all','companies_summary'])
                        }
                    ],
                    companies: [
                        'Company', function (Company) {
                            return Company.getAll(['companies_all','addresses_summary'])
                        }
                    ]
                },
                onEnter: ['announcerDialogService', 'Announcer', 'Company', 'companies', 'contacts', 'databases',
                    function(announcerDialogService, Announcer, Company, companies, contacts,databases) {
                        var announcer = Announcer.init();
                        var company = Company.init();
                        announcerDialogService.openDialogModal(announcer,company,companies,contacts,databases);
                    }]
            })
            .state('announcer.edit', {
                parent: 'announcer',
                url: '/edit/:announcerId',
                data: {
                    pageTitle: 'Create an announcer',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                resolve: {
                    announcer: [
                        'Announcer', '$stateParams', function(Announcer, $stateParams) {
                        var announcerId = $stateParams.announcerId;
                        return Announcer.get(announcerId,
                            ['announcers_all','contacts_summary','companies_all','addresses_summary']);
                        }
                    ],
                    contacts: [
                        'Contact', function (Contact) {
                            return Contact.getAll(['contacts_all','companies_summary'])
                        }
                    ],
                    companies: [
                        'Company', function (Company) {
                            return Company.getAll(['companies_all','addresses_summary'])
                        }
                    ]
                },
                onEnter: ['announcerDialogService', 'Announcer', 'companies', 'contacts', 'announcer',
                    function(announcerDialogService, Announcer, companies, contacts, announcer) {
                        announcerDialogService.openDialogModal(announcer,companies,contacts);
                    }]
            })
        ;
    }
})();
