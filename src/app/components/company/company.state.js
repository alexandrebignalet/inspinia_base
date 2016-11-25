(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('company', {
                parent: 'components',
                url: '/companies',
                data: {
                    pageTitle: 'Company',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                views: {
                    'content@': {
                        template: '<company companies="$resolve.companies"></company>'
                    }
                },
                resolve: {
                    companies: [
                        'Company', function(Company) {
                            return Company.getAll();
                        }
                    ],
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('company');
                        $translatePartialLoader.addPart('contact');
                        $translatePartialLoader.addPart('address');
                        return $translate.refresh();
                    }],
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['datatables']);
                    }
                }
            })
            .state('company.create', {
                parent: 'company',
                url: '/create',
                data: {
                    pageTitle: 'Create a company',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                resolve: {
                    databases: ['Database', function(Database){
                        return Database.getAll();
                    }]
                },
                onEnter: ['CompanyDialogService', 'Company', 'databases',
                    function(CompanyDialogService, Company, databases) {
                        var company = Company.init();
                        CompanyDialogService.openDialogModal(company, databases);
                    }]
            })
            .state('company.edit', {
                parent: 'company',
                url: '/{id}/edit',
                data: {
                    pageTitle: 'Edit a company',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                resolve: {
                    company: ['Company', '$stateParams', function(Company, $stateParams){
                        return Company.get($stateParams.id)
                    }]
                },
                onEnter: ['CompanyDialogService', 'company',
                    function(CompanyDialogService, company) {
                        CompanyDialogService.openDialogModal(company);
                    }]
            })
            .state('company.delete', {
                parent: 'company',
                url: '/{id}/delete',
                data: {
                    pageTitle: 'Edit a company',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['CompanyDialogService', '$stateParams',
                    function(CompanyDialogService, $stateParams) {
                        CompanyDialogService.openDeleteModal($stateParams.id);
                    }]
            });
    }
})();
