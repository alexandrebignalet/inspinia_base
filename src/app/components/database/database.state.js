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
                url: '/database',
                data: {
                    pageTitle: 'Database',
                    authorities: ['ROLE_ADMIN', 'ROLE_USER']
                },
                views: {
                    'content@': {
                        templateUrl: 'app/components/database/databases.html',
                        controller: 'DatabaseController',
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
