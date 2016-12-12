(function() {
    'use strict';

    angular
        .module('dataToolApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {

        $stateProvider
            .state('database', {
                parent: 'components',
                url: '/databases',
                data: {
                    pageTitle: 'Database',
                    authorities: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_SUPER_ADMIN']
                },
                views: {
                    'content@': {
                        template: '<databases databases="$resolve.databases"></databases>'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('database');
                        return $translate.refresh();
                    }],

                    databases: ['Database', function(Database){
                        return Database.getAll(['databases_all', 'companies_summary']);
                    }],
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['datatables']);
                    }
                }
            })
            .state('database.show', {
                parent: 'database',
                url: '/show/:databaseId',
                data: {
                    pageTitle: 'Database show',
                    authorities: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']
                },
                views: {
                    'content@': {
                        template: '<database-show database="$resolve.database"></database-show>'
                    }
                },
                resolve: {
                    database: [
                        'Database','$stateParams', function(Database, $stateParams) {
                            var databaseId = $stateParams.databaseId;
                            var context = ['databases_all'];
                            return Database.get(databaseId,context);
                        }
                    ],
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('database');
                        return $translate.refresh();
                    }],
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['chartJs']);
                    }
                }
            })
        ;
    }
})();
