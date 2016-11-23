(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('contact', {
                parent: 'components',
                url: '/contact',
                data: {
                    pageTitle: 'Contact'
                },
                views: {
                    'content@': {
                        template: '<contact contacts="$resolve.data"></contact>'
                    }
                },
                resolve: {
                    data: [
                        'Contact', function(Contact) {
                            return Contact.getAll(['contacts_all','companies_all'])
                        }
                    ],
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('contact');
                        return $translate.refresh();
                    }],
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'datatables'
                        ]);
                    }
                }
            })
            .state('contact.create', {
                parent: 'contact',
                url: '/create',
                data: {
                    pageTitle: 'Create a contact',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                resolve: {
                    companies: [
                        'Company', function (Company) {
                            return Company.getAll(['companies_all'])
                        }
                    ]
                },
                onEnter: ['contactDialogService', 'Contact', 'companies',
                    function(contactDialogService,Contact, companies) {
                        var contact = Contact.initContact();
                        contactDialogService.openDialogModal(contact,companies);
                    }]
            })
            .state('contact.edit', {
                parent: 'contact',
                url: '/edit/:contactId',
                data: {
                    pageTitle: 'Edit a contact',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                resolve: {
                    contact: [
                        'Contact','$stateParams', function (Contact,$stateParams) {
                            var contactId = $stateParams.contactId;
                            return Contact.get(contactId,['contacts_all','companies_all'])
                        }
                    ],
                    companies: [
                        'Company', function (Company) {
                            return Company.getAll(['companies_all'])
                        }
                    ]
                },
                onEnter: ['contactDialogService', 'contact', 'companies',
                    function(contactDialogService, contact, companies) {
                        contactDialogService.openDialogModal(contact,companies);
                    }]
            })
            .state('contact.delete', {
                parent: 'contact',
                url: '/delete/:contactId',
                data: {
                    pageTitle: 'Delete a Contact',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['contactDialogService', '$stateParams',
                    function(contactDialogService, $stateParams) {
                        var contactId = $stateParams.contactId;
                        contactDialogService.openDeleteModal(contactId);
                    }]

            })
        ;
    }
})();
