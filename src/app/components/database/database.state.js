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

                    databases: ['Database', '$q', 'ToastrService', function(Database, $q, ToastrService){
                        return Database.get({
                            'context': angular.toJson(['databases_all', 'companies_summary'])
                        }).$promise
                            .then(getDatabasesThen)
                            .catch(getDatabasesCatch);

                        function getDatabasesThen(data){
                            return data.databases;
                        }
                        function getDatabasesCatch(error){
                            ToastrService.error(error, 'Impossible to retrieve users.');
                            return $q.reject(error);
                        }
                    }],
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['datatables']);
                    }
                }
            });
    }
})();
