(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('database.create', {
                parent: 'database',
                url: '/create',
                data: {
                    pageTitle: 'Create a database',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['DatabaseDialogService', 'Database',
                    function(DatabaseDialogService, Database) {
                        var database = Database.init();
                        DatabaseDialogService.openDialogModal(database);
                    }]
            })
            .state('database.edit', {
                parent: 'database',
                url: '/{id}/edit',
                data: {
                    pageTitle: 'Edit a database',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                onEnter: ['$stateParams', 'DatabaseDialogService', 'Database',
                    function($stateParams, DatabaseDialogService, Database) {
                        var database = Database.get($stateParams.id);
                        DatabaseDialogService.openDialogModal(database);
                    }]
            });
    }
})();
